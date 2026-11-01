"""Startet den lokalen Thai-Server über HTTPS im Heimnetz und zeigt einen QR-Code fürs Handy."""
import datetime
import ipaddress
import pathlib
import socket
import sys

import uvicorn
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID

ROOT = pathlib.Path(__file__).resolve().parent
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8443


def lan_ip() -> str:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("192.168.0.1", 1))  # es wird nichts gesendet, nur Route ermittelt
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


def ensure_cert(ip: str):
    cert, key = ROOT / "cert.pem", ROOT / "key.pem"
    marker = ROOT / "cert.ip"
    if cert.exists() and key.exists() and marker.exists() and marker.read_text() == ip:
        return cert, key
    k = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "Thai lernen (lokal)")])
    now = datetime.datetime.now(datetime.timezone.utc)
    c = (
        x509.CertificateBuilder()
        .subject_name(name)
        .issuer_name(name)
        .public_key(k.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(now - datetime.timedelta(days=1))
        .not_valid_after(now + datetime.timedelta(days=825))
        .add_extension(
            x509.SubjectAlternativeName([x509.DNSName("localhost"), x509.IPAddress(ipaddress.ip_address(ip)), x509.IPAddress(ipaddress.ip_address("127.0.0.1"))]),
            critical=False,
        )
        .sign(k, hashes.SHA256())
    )
    key.write_bytes(k.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.TraditionalOpenSSL, serialization.NoEncryption()))
    cert.write_bytes(c.public_bytes(serialization.Encoding.PEM))
    marker.write_text(ip)
    return cert, key


if __name__ == "__main__":
    ip = lan_ip()
    cert, key = ensure_cert(ip)
    url = f"https://{ip}:{PORT}"
    print("\n  Thai lernen läuft unter:", url)
    try:
        import qrcode

        q = qrcode.QRCode(border=1)
        q.add_data(url)
        q.print_ascii(invert=True)
    except Exception:
        pass
    print("  Beim ersten Öffnen warnt Chrome vor dem selbst signierten Zertifikat:")
    print("  „Erweitert“ → „Weiter zu … (unsicher)“. Das ist dein eigener Rechner.\n")
    uvicorn.run("app:app", app_dir=str(ROOT), host="0.0.0.0", port=PORT, ssl_certfile=str(cert), ssl_keyfile=str(key), log_level="warning")
