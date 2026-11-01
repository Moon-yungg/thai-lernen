"""Regelbasierte Fehlerdiagnose für Thai-Aussprache.

Aus Zieltext, frei erkanntem Text und Silben-/Tonanalyse werden konkrete, phonetisch begründete
Fehler abgeleitet (Behauchung, Stimmhaftigkeit, Vokallänge, Vokalqualität, r/l, Auslaute, Töne).
Diese Fakten sind die Grundlage für das LLM, das sie nur noch verständlich formuliert.
"""
from __future__ import annotations

import difflib

import numpy as np

# Konsonant → (Artikulationsgruppe, Art, Laut)   Art: asp = behaucht, unasp = unbehaucht, voiced = stimmhaft
CONS: dict[str, tuple[str, str, str]] = {}
for chars, group, kind, sound in [
    ("ก", "k", "unasp", "g/k (ohne Hauch)"),
    ("ขฃคฅฆ", "k", "asp", "kh (mit Hauch)"),
    ("จ", "ch", "unasp", "dj/tsch (ohne Hauch)"),
    ("ฉชฌ", "ch", "asp", "tsch (mit Hauch)"),
    ("ดฎ", "t", "voiced", "d (stimmhaft)"),
    ("ตฏ", "t", "unasp", "dt (ohne Hauch)"),
    ("ถฐทธฑฒ", "t", "asp", "th (mit Hauch)"),
    ("บ", "p", "voiced", "b (stimmhaft)"),
    ("ป", "p", "unasp", "bp (ohne Hauch)"),
    ("ผพภ", "p", "asp", "ph (mit Hauch)"),
    ("ฝฟ", "f", "fric", "f"),
    ("ซศษส", "s", "fric", "s"),
    ("หฮ", "h", "fric", "h"),
    ("ง", "ng", "nasal", "ng"),
    ("นณ", "n", "nasal", "n"),
    ("ม", "m", "nasal", "m"),
    ("ญย", "y", "approx", "j"),
    ("ร", "r", "liquid", "r"),
    ("ลฬ", "l", "liquid", "l"),
    ("ว", "w", "approx", "w"),
    ("อ", "glottal", "glottal", "stummer Träger"),
]:
    for c in chars:
        CONS[c] = (group, kind, sound)

# Buchstabennamen (so werden Konsonanten einzeln ausgesprochen)
NAMES = dict(zip("กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ", (
    "กอ ไก่|ขอ ไข่|ฃอ ขวด|คอ ควาย|ฅอ คน|ฆอ ระฆัง|งอ งู|จอ จาน|ฉอ ฉิ่ง|ชอ ช้าง|ซอ โซ่|ฌอ เฌอ|ญอ หญิง|ฎอ ชฎา|ฏอ ปฏัก|ฐอ ฐาน|ฑอ มณโฑ|"
    "ฒอ ผู้เฒ่า|ณอ เณร|ดอ เด็ก|ตอ เต่า|ถอ ถุง|ทอ ทหาร|ธอ ธง|นอ หนู|บอ ใบไม้|ปอ ปลา|ผอ ผึ้ง|ฝอ ฝา|พอ พาน|ฟอ ฟัน|ภอ สำเภา|มอ ม้า|"
    "ยอ ยักษ์|รอ เรือ|ลอ ลิง|วอ แหวน|ศอ ศาลา|ษอ ฤๅษี|สอ เสือ|หอ หีบ|ฬอ จุฬา|ออ อ่าง|ฮอ นกฮูก").split("|")))

# Vokalzeichen-Paare (kurz, lang) und Vokalqualitäten
LENGTH_PAIRS = [("ะ", "า"), ("ิ", "ี"), ("ึ", "ื"), ("ุ", "ู"), ("ั", "า")]
VOWEL_NAME = {"ะ": "kurzes a", "า": "langes aa", "ั": "kurzes a", "ิ": "kurzes i", "ี": "langes ii", "ึ": "kurzes ü-artiges ue",
              "ื": "langes ue", "ุ": "kurzes u", "ู": "langes uu", "เ": "e", "แ": "offenes ä", "โ": "o", "ไ": "ai", "ใ": "ai", "ำ": "am", "อ": "offenes o (or)"}
TONE_MARKS = {"่": "Mai Ek", "้": "Mai Tho", "๊": "Mai Tri", "๋": "Mai Chattawa"}

TONE_DE = {"m": "mittel", "l": "tief", "f": "fallend", "h": "hoch", "r": "steigend"}
TONE_HOW = {
    "m": "gleichbleibend in deiner normalen, entspannten Stimmlage",
    "l": "tief beginnen und leicht absinken – etwas tiefer als normal sprechen",
    "f": "hoch ansetzen und dann deutlich fallen – wie ein bestimmtes deutsches „Nein!“",
    "h": "hoch sprechen und am Ende noch etwas ansteigen – angespannte, hohe Stimme",
    "r": "erst leicht absinken, dann deutlich nach oben – wie ein erstauntes „Ja?“",
}


def _describe_contour(c: list[float] | None) -> str | None:
    if not c or len(c) < 4:
        return None
    a = np.array(c)
    q = max(1, len(a) // 4)
    start, end = a[:q].mean(), a[-q:].mean()
    lo_pos = int(np.argmin(a)) / (len(a) - 1)
    delta = end - start
    level = "hoch" if a.mean() > 1.5 else "tief" if a.mean() < -1.5 else "mittel"
    if delta > 2 and 0.15 < lo_pos < 0.7 and a.min() < start - 0.5:
        shape = "erst abgesunken und dann gestiegen"
    elif delta > 1.5:
        shape = "gestiegen"
    elif delta < -1.5:
        shape = "gefallen"
    else:
        shape = "ziemlich flach geblieben"
    return f"deine Stimme ist {shape} (Lage eher {level})"


def _syllable_of(index: int, syllables: list[dict]) -> str | None:
    pos = 0
    for s in syllables:
        if pos <= index < pos + len(s["text"]):
            return s["text"]
        pos += len(s["text"])
    return None


def diagnose(clean: str, recognized: str, syllables: list[dict], tone_mode: str | None) -> list[dict]:
    heard = recognized.replace(" ", "")
    issues: list[dict] = []

    def add(kind: str, syl: str | None, title: str, detail: str, tip: str, weight: float, compare: list | None = None):
        issues.append({"type": kind, "syllable": syl, "title": title, "detail": detail, "tip": tip, "weight": weight, "compare": compare})

    sm = difflib.SequenceMatcher(a=clean, b=heard, autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal":
            continue
        tgt, got = clean[i1:i2], heard[j1:j2]
        syl = _syllable_of(i1, syllables)
        if op == "replace" and len(tgt) == len(got):
            for k, (t, g) in enumerate(zip(tgt, got)):
                s_k = _syllable_of(i1 + k, syllables)
                _pair(add, t, g, s_k, _variant(clean, syllables, i1 + k, t, g))
        elif op == "replace" and len(tgt) == 1 and tgt in "ึืิีุู" and any(c in "ึืิีุู" for c in got):
            # Vokal durch Vokal mit Trägerzeichen ersetzt (z.B. ี → ือ): als Vokalqualität werten
            _pair(add, tgt, next(c for c in got if c in "ึืิีุู"), syl, (syl, _swap(syl, tgt, got)))
        elif op == "replace":
            add("sound", syl, f"„{tgt}“ klang wie „{got}“", f"In „{syl}“ wurde statt „{tgt}“ eher „{got}“ gehört.", "Hör dir das Vorbild langsam (🐢) an und sprich Silbe für Silbe nach.", 0.6,
                _cmp(syl, _swap(syl, tgt, got)))
        elif op == "delete":
            if all(c in CONS for c in tgt) and syl and syl.endswith(tgt):
                add("final", syl, f"Auslaut in „{syl}“ verschluckt", f"Der Endkonsonant „{tgt}“ war nicht zu hören.",
                    "Thai-Auslaute (k, t, p) werden nicht gelöst, aber die Zunge/Lippen schließen trotzdem: Mund am Ende kurz schließen, ohne Luft auszustoßen.", 0.5,
                    _cmp(syl, syl[: -len(tgt)]))
            elif any(c in TONE_MARKS for c in tgt):
                pass  # Tonzeichen fehlen in der Erkennung – Ton wird separat über die Tonhöhe bewertet
            else:
                add("missing", syl, f"„{tgt}“ fehlte", f"In „{syl}“ fehlte der Laut „{tgt}“.", "Sprich etwas langsamer und deutlicher.", 0.5)
        elif op == "insert":
            add("extra", syl, f"Zusätzlicher Laut „{got}“", f"Bei „{syl or clean}“ wurde zusätzlich „{got}“ gehört.", "Achte darauf, keine Laute anzuhängen (z.B. kein „e“ nach Endkonsonanten).", 0.3)

    # Töne
    for s in syllables:
        exp = s.get("expected")
        desc = _describe_contour(s.get("contour"))
        if tone_mode == "reference" and s.get("sim") is not None and s["sim"] < 0.6:
            ref_desc = _describe_contour(s.get("ref"))
            add("tone", s["text"], f"Ton bei „{s['text']}“: evtl. anders als das Vorbild",
                f"Erwartet: {TONE_DE.get(exp, '?')}er Ton. Beim Vorbild ist {ref_desc.replace('deine Stimme', 'die Stimme') if ref_desc else 'die Kurve anders'}; bei dir: {desc or 'kaum messbar'}.",
                f"{TONE_DE.get(exp, '').capitalize()}er Ton: {TONE_HOW.get(exp, 'Vorbild genau nachahmen')}.", 0.45,
                [{"label": f"Vorbild ({TONE_DE.get(exp, '?')})", "text": s["text"], "ok": True}])
        elif tone_mode == "template" and exp and s.get("detected") and s["detected"] != exp:
            add("tone", s["text"], f"Ton bei „{s['text']}“: evtl. nicht {TONE_DE[exp]}",
                f"Gemessen klang es eher {TONE_DE[s['detected']]} – {desc or ''}.",
                f"{TONE_DE[exp].capitalize()}er Ton: {TONE_HOW[exp]}. (Die Tonmessung ist eine Schätzung – vergleiche die Kurven und hör dir das Vorbild an.)", 0.4,
                [{"label": f"Vorbild ({TONE_DE[exp]})", "text": s["text"], "ok": True}])
    issues.sort(key=lambda x: -x["weight"])
    return issues[:5]


def _swap(syl: str | None, tgt: str, got: str) -> str | None:
    return syl.replace(tgt, got, 1) if syl and tgt in syl else None


def _variant(clean: str, syllables: list[dict], index: int, t: str, g: str) -> tuple[str | None, str | None]:
    """Zielsilbe und dieselbe Silbe mit dem gehörten Zeichen an Stelle index."""
    pos = 0
    for s in syllables:
        if pos <= index < pos + len(s["text"]):
            k = index - pos
            return s["text"], s["text"][:k] + g + s["text"][k + 1 :]
        pos += len(s["text"])
    return None, None


def _cmp(right: str | None, heard: str | None, extra: list | None = None) -> list | None:
    out = []
    if right:
        out.append({"label": "richtig", "text": right, "ok": True})
    if heard and heard != right:
        out.append({"label": "so klang es", "text": heard, "ok": False})
    return (out + (extra or [])) or None


def _pair(add, t: str, g: str, syl: str | None, variant: tuple[str | None, str | None] = (None, None)):
    right, heard = variant
    names = [{"label": f"Buchstabe {t}", "text": NAMES[t], "ok": True}, {"label": f"Buchstabe {g}", "text": NAMES[g], "ok": False}] if t in NAMES and g in NAMES else None
    cmp = _cmp(right, heard, names)
    if t in CONS and g in CONS:
        (tg, tk, ts), (gg, gk, gs) = CONS[t], CONS[g]
        if tg == gg and {tk, gk} <= {"asp", "unasp", "voiced"}:
            if "asp" in (tk, gk) and tk != gk:
                more = gk == "asp"
                add("aspiration", syl, f"„{t}“ {'zu stark' if more else 'zu schwach'} behaucht",
                    f"Ziel ist {ts}, gehört wurde {gs} („{g}“).",
                    "Halte die Hand vor den Mund: Bei unbehauchten Lauten (ก ต ป จ) spürst du KEINEN Luftstoß, bei behauchten (ค ท พ ช) einen deutlichen."
                    if more else "Bei behauchten Lauten (ค ท พ ช) kommt nach dem Laut ein kräftiger Luftstoß – wie im deutschen „Kater“.", 0.7, cmp)
            else:
                add("voicing", syl, f"„{t}“ klang wie „{g}“", f"Ziel ist {ts}, gehört wurde {gs}.",
                    "ด/บ sind stimmhaft (Stimmbänder schwingen schon während des Verschlusses), ต/ป sind stimmlos und unbehaucht – dazwischen liegt der Unterschied.", 0.6, cmp)
            return
        if {tg, gg} == {"r", "l"}:
            add("rl", syl, f"„{t}“ und „{g}“ verwechselt", f"Ziel ist {ts}, gehört wurde {gs}.",
                "ร ist ein gerolltes/getipptes Zungenspitzen-r (wie im Italienischen). Im Alltag sagen viele Thais l – aber deutlich ist r besser.", 0.4, cmp)
            return
        if t == "ง":
            add("ng", syl, "ng-Laut nicht getroffen", f"Ziel ist ng („ง“), gehört wurde {gs}.",
                "ng wie in „singen“ – aber am Silbenanfang: sag „singen“, halte das ng und beginne daraus die Silbe.", 0.6, cmp)
            return
        add("sound", syl, f"„{t}“ klang wie „{g}“", f"Ziel ist {ts}, gehört wurde {gs}.", "Vergleiche langsam mit dem Vorbild (🐢).", 0.5, cmp)
        return
    for short, long_ in LENGTH_PAIRS:
        if {t, g} == {short, long_}:
            too_long = g == long_
            add("length", syl, f"Vokal in „{syl}“ zu {'lang' if too_long else 'kurz'}",
                f"Ziel ist {VOWEL_NAME.get(t, t)}, gehört wurde {VOWEL_NAME.get(g, g)}.",
                "Vokallänge verändert im Thai die Bedeutung! Kurze Vokale abrupt beenden, lange bewusst dehnen.", 0.7, cmp)
            return
    if (t in "ิี" and g in "ึื") or (t in "ึื" and g in "ิี"):
        to_ue = g in "ึื"
        add("quality", syl, f"i/ue in „{syl}“ verwechselt", f"Ziel ist {VOWEL_NAME.get(t, t)}, gehört wurde {VOWEL_NAME.get(g, g)}.",
            "Für i (ิ ี) liegt die Zunge VORNE an den unteren Schneidezähnen – wie im deutschen „Biene“." if to_ue
            else "Für ue (ึ ื) Lippen breit wie beim „i“ lassen, aber die Zunge nach HINTEN ziehen – nicht runden, sonst wird es ein ü.", 0.6, cmp)
        return
    if {t, g} <= {"ึ", "ื", "ุ", "ู"}:
        add("quality", syl, f"ue/u in „{syl}“ verwechselt", f"Ziel ist {VOWEL_NAME.get(t, t)}, gehört wurde {VOWEL_NAME.get(g, g)}.",
            "Für ue (ึ ื) die Lippen breit lassen wie beim „i“, aber die Zunge nach hinten ziehen. Für u (ุ ู) die Lippen runden.", 0.6, cmp)
        return
    if t in TONE_MARKS or g in TONE_MARKS:
        return  # Tonzeichen: Bewertung über Tonhöhe
    add("sound", syl, f"„{t}“ klang wie „{g}“", f"In „{syl}“ wurde statt „{t}“ eher „{g}“ gehört.", "Vergleiche langsam mit dem Vorbild (🐢).", 0.4, cmp)
