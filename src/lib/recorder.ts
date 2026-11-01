// Mikrofon-Aufnahme mit automatischem Stopp bei Stille; liefert zusätzlich ein 16-kHz-WAV für den Analyse-Server.

export interface Recording {
  url: string // zum Anhören
  wav: Blob // 16 kHz mono PCM
}

export function record(opts: { onLevel?: (v: number) => void; maxMs?: number } = {}): { promise: Promise<Recording>; stop: () => void } {
  let stopFn = () => {}
  const promise = new Promise<Recording>(async (resolve, reject) => {
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
    } catch {
      return reject(new Error('Kein Mikrofon-Zugriff'))
    }
    const mr = new MediaRecorder(stream)
    const chunks: Blob[] = []
    const ctx = new AudioContext()
    const an = ctx.createAnalyser()
    an.fftSize = 1024
    ctx.createMediaStreamSource(stream).connect(an)
    const buf = new Float32Array(an.fftSize)
    const t0 = performance.now()
    let spoke = false
    let lastLoud = t0
    let raf = 0
    const tick = () => {
      an.getFloatTimeDomainData(buf)
      const rms = Math.sqrt(buf.reduce((a, b) => a + b * b, 0) / buf.length)
      opts.onLevel?.(Math.min(1, rms * 8))
      const now = performance.now()
      if (rms > 0.02) {
        spoke = true
        lastLoud = now
      }
      if ((spoke && now - lastLoud > 1100) || now - t0 > (opts.maxMs ?? 7000)) return stop()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      if (mr.state === 'recording') mr.stop()
    }
    stopFn = stop
    mr.ondataavailable = (e) => chunks.push(e.data)
    mr.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop())
      ctx.close()
      const blob = new Blob(chunks, { type: mr.mimeType })
      try {
        resolve({ url: URL.createObjectURL(blob), wav: await toWav16k(blob) })
      } catch (e) {
        reject(e)
      }
    }
    mr.start()
    tick()
  })
  return { promise, stop: () => stopFn() }
}

async function toWav16k(blob: Blob): Promise<Blob> {
  const ab = await blob.arrayBuffer()
  const tmp = new AudioContext()
  const decoded = await tmp.decodeAudioData(ab)
  tmp.close()
  const len = Math.ceil(decoded.duration * 16000)
  const off = new OfflineAudioContext(1, len, 16000)
  const src = off.createBufferSource()
  src.buffer = decoded
  src.connect(off.destination)
  src.start()
  const pcm = (await off.startRendering()).getChannelData(0)
  const out = new DataView(new ArrayBuffer(44 + pcm.length * 2))
  const w = (o: number, s: string) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)))
  w(0, 'RIFF')
  out.setUint32(4, 36 + pcm.length * 2, true)
  w(8, 'WAVE')
  w(12, 'fmt ')
  out.setUint32(16, 16, true)
  out.setUint16(20, 1, true)
  out.setUint16(22, 1, true)
  out.setUint32(24, 16000, true)
  out.setUint32(28, 32000, true)
  out.setUint16(32, 2, true)
  out.setUint16(34, 16, true)
  w(36, 'data')
  out.setUint32(40, pcm.length * 2, true)
  pcm.forEach((v, i) => out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true))
  return new Blob([out], { type: 'audio/wav' })
}
