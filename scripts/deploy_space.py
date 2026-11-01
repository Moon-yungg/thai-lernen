"""Lädt den Analyse-Server als Hugging Face Space hoch.

Vorher einmal anmelden:  server/.venv/Scripts/hf auth login   (Token mit Schreibrechten)
Aufruf:                  server/.venv/Scripts/python scripts/deploy_space.py <benutzername>/<space-name>
"""
import shutil, sys, tempfile, pathlib
from huggingface_hub import HfApi

root = pathlib.Path(__file__).resolve().parent.parent
repo = sys.argv[1] if len(sys.argv) > 1 else None
api = HfApi()
if not repo:
    repo = f"{api.whoami()['name']}/thai-lernen-analyse"
api.create_repo(repo, repo_type="space", space_sdk="docker", exist_ok=True, private=False)
with tempfile.TemporaryDirectory() as d:
    d = pathlib.Path(d)
    shutil.copytree(root / "deploy" / "hf-space", d, dirs_exist_ok=True)
    for f in ("app.py", "explain.py"):
        shutil.copy(root / "server" / f, d / f)
    shutil.copytree(root / "public" / "audio", d / "audio")  # Vorbild-Aufnahmen für den Tonvergleich
    api.upload_folder(repo_id=repo, repo_type="space", folder_path=str(d), commit_message="Analyse-Server aktualisieren")
host = repo.replace("/", "-").lower()
print(f"Space: https://huggingface.co/spaces/{repo}")
print(f"API:   https://{host}.hf.space")
