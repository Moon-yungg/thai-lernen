# Hugging Face Space (Docker, CPU): Thai-Ausspracheanalyse
FROM python:3.12-slim
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user PATH=/home/user/.local/bin:$PATH HF_HOME=/home/user/.cache/huggingface PYTHONUNBUFFERED=1
WORKDIR /app
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --user torch torchaudio --index-url https://download.pytorch.org/whl/cpu \
 && pip install --no-cache-dir --user -r requirements.txt
# Modell schon beim Bauen laden, damit der Start schneller geht
RUN python -c "from transformers import AutoModelForCTC, AutoProcessor; m='airesearch/wav2vec2-large-xlsr-53-th'; AutoProcessor.from_pretrained(m); AutoModelForCTC.from_pretrained(m)" \
 && python -c "from pythainlp.tokenize import syllable_tokenize; syllable_tokenize('สวัสดีครับ')"
COPY --chown=user . .
EXPOSE 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
