#!/usr/bin/env python3
"""Generate forensic facts PDF for maxhussmann.com (police submission)."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "docs" / "maxhussmann-polizei-forensik.pdf"
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


class ReportPDF(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "", 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, f"Seite {self.page_no()}/{{nb}}", align="C")


def w(pdf: FPDF) -> float:
    return pdf.epw


def section(pdf: FPDF, title: str) -> None:
    pdf.ln(4)
    pdf.set_font("Arial", "B", 12)
    pdf.set_text_color(20, 20, 20)
    pdf.multi_cell(w(pdf), 7, title)
    pdf.set_font("Arial", "", 10)
    pdf.set_text_color(30, 30, 30)


def bullet(pdf: FPDF, text: str) -> None:
    pdf.multi_cell(w(pdf), 5.5, f"  - {text}")


def kv(pdf: FPDF, key: str, value: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Arial", "", 10)
    pdf.multi_cell(w(pdf), 5.5, f"{key} {value}")


def para(pdf: FPDF, text: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(w(pdf), 5.5, text)


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    pdf = ReportPDF(orientation="P", unit="mm", format="A4")
    pdf.alias_nb_pages()
    pdf.set_margins(20, 20, 20)
    pdf.add_font("Arial", "", FONT)
    pdf.add_font("Arial", "B", FONT_BOLD)
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    pdf.set_font("Arial", "B", 16)
    pdf.multi_cell(w(pdf), 8, "Technischer Sachstandsbericht")
    pdf.set_font("Arial", "B", 13)
    pdf.multi_cell(w(pdf), 7, "Domain: maxhussmann.com")
    pdf.ln(2)
    pdf.set_font("Arial", "", 10)
    pdf.multi_cell(
        w(pdf),
        5.5,
        "Zweck: Einreichung bei Strafverfolgungsbehoerden / IT-Forensik. "
        "Passiv erhobene technische Fakten (OSINT), keine aktiven Angriffe. Keine Rechtsbewertung.",
    )
    pdf.ln(1)
    kv(pdf, "Erstellt:", now)
    kv(pdf, "Mandantenkontext:", "Warn-/Diffamierungsseite gegen Max Hussmann")

    section(pdf, "1. Kurzfassung")
    bullet(pdf, "Statische Website auf GoDaddy Website Builder (DPS), keine eigene Server-Infrastruktur des Betreibers oeffentlich sichtbar.")
    bullet(pdf, "Domain-Inhaber ueber WHOIS anonymisiert (Domains By Proxy / GoDaddy).")
    bullet(pdf, "Neuer Inhalt veroeffentlicht ca. 1. Juni 2026 (Publish-Zeitstempel + Sitemap + Screenshot-Dateiname).")
    bullet(pdf, "Deanonymisierung ueber oeffentliche Website-Daten nicht moeglich; Spuren verweisen auf GoDaddy-, Apple- und Google-Konten.")

    section(pdf, "2. Domain & Registrar")
    kv(pdf, "Domain:", "maxhussmann.com / www.maxhussmann.com")
    kv(pdf, "Registrar:", "GoDaddy.com, LLC (IANA 146)")
    kv(pdf, "Erstellt:", "2020-09-11")
    kv(pdf, "WHOIS zuletzt:", "2025-09-12 (Registrar-Datum)")
    kv(pdf, "Registrant:", "Registration Private / Domains By Proxy, LLC, Tempe, Arizona, US")
    kv(pdf, "Nameserver:", "ns21.domaincontrol.com, ns22.domaincontrol.com")
    kv(pdf, "Abuse GoDaddy:", "abuse@godaddy.com / +1-480-624-2505")
    bullet(pdf, "Status: clientDeleteProhibited, clientTransferProhibited, clientUpdateProhibited, clientRenewProhibited")

    section(pdf, "3. Hosting & oeffentliche IP-Adressen")
    para(
        pdf,
        "Hinweis: Diese IPs gehoeren zum geteilten GoDaddy/AWS-Frontend, nicht zum Heimnetz des Betreibers.",
    )
    kv(pdf, "A-Record 1:", "13.248.243.5")
    kv(pdf, "A-Record 2:", "76.223.105.230")
    kv(pdf, "Reverse DNS:", "a16e665f42988324c.awsglobalaccelerator.com")
    kv(pdf, "Inhaber Netz:", "Amazon Technologies Inc. (AWS Global Accelerator)")
    kv(pdf, "HTTP Server:", "DPS/2.0.0+sha-1109afc")
    kv(pdf, "X-SiteId (Edge):", "ap-south-1 (GoDaddy DPS Region)")
    kv(pdf, "TLS-Zertifikat:", "GoDaddy Secure Certificate Authority G2, CN=maxhussmann.com")

    section(pdf, "4. GoDaddy Website Builder - Identifikatoren")
    para(pdf, "Fuer Auskunftsersuchen an GoDaddy (Login-, Upload-, Publish-Logs):")
    kv(pdf, "accountId:", "1f4bec36-f40d-11ea-81df-3417ebe724ff")
    kv(pdf, "websiteId:", "3aa26dea-b26a-49d3-8e79-d3dc9812859c")
    kv(pdf, "Kontakt-Widget:", "d80ad042-9b62-4321-982e-a68a150de7f7 (MESSAGING / Conversations)")
    kv(pdf, "Publish-Script:", "gpub/21b03db393f03c52/script.js, gpub/720e544df8b7ea00/script.js")
    kv(pdf, "Analytics:", "tccl.baseHost: secureserver.net (GoDaddy intern)")
    bullet(pdf, "Oeffentliches Kontaktformular: keine E-Mail-Adresse im HTML; Weiterleitung ueber GoDaddy Conversations/Reamaze.")
    kv(pdf, "Formular-Endpoint:", "https://contact.apps-api.instantpage.secureserver.net")
    kv(pdf, "Welcome-Message:", "Hi, if you have been a victim of Max Hussmann or have information about him, please use this form.")
    kv(pdf, "GoDaddy-Plan (Widget):", "starter; Conversations/Reamaze aktiv (notificationPreference: REAMAZE)")
    bullet(pdf, "Formularfelder: Name, Mobile (Pflicht), E-Mail (Pflicht), Nachricht. Submissions ueber GoDaddy-API loggbar.")

    section(pdf, "5. Zeitachse (Forensik)")
    kv(pdf, "Publish (UTC):", "2026-06-01T09:55:28.695Z (im Publish-Script: pd-Feld)")
    kv(pdf, "Sitemap lastmod:", "2026-06-01")
    kv(pdf, "Screenshot-Dateiname:", "Screenshot 2026-06-01 at 11.23.30.png (macOS-Benennung)")
    kv(pdf, "CDN-Derivat WebP:", "FileModifyDate 2026-06-06 15:14:35 UTC (GoDaddy Resize/Cache, nicht Uploader)")
    bullet(pdf, "HTML-Groesse stieg von ca. 114 KB (Mai 2026) auf ca. 143 KB (Juni 2026).")
    bullet(pdf, "Page-ID im HTML wechselte von page-11520 auf page-6204 (Neu-Veroeffentlichung).")

    section(pdf, "6. Bild-Beweismittel (CDN)")
    kv(
        pdf,
        "Original-URL:",
        "https://img1.wsimg.com/isteam/ip/3aa26dea-b26a-49d3-8e79-d3dc9812859c/"
        "Screenshot%202026-06-01%20at%2011.23.30.png",
    )
    kv(pdf, "WebP-Variante:", "rs=w:2320,h:2256 (entspricht Metadaten-Analyse)")
    kv(pdf, "EXIF UserComment:", "Screenshot")
    kv(pdf, "EXIF Pixel (XMP):", "3044 x 2960 (Original-Screenshot)")
    kv(pdf, "CDN-Auslieferung:", "1755 x 1706 (mit Crop) / 2320 x 2256 (skaliert)")
    kv(
        pdf,
        "SHA-256 (PNG):",
        "c1144ad98ba43235349e31a55a812085d1ef0dde5e4d102157f9b4e497a26290",
    )
    para(
        pdf,
        "Interpretation: Upload durch Person mit macOS (Bildschirmfoto), "
        "kein Kamerafoto. Metadaten ueberleben auf GoDaddy-CDN; Uploader-IP nicht in EXIF.",
    )
    para(pdf, "Weitere CDN-Dateinamen (Upload-Zeitstempel im Namen):")
    bullet(pdf, "Screen Shot 2020-08-24/25, 2020-09-27 (mehrere) — aelteste Inhalte, macOS-Benennung.")
    bullet(pdf, "Screenshot 2024-03-09 at 11.19.28.png — Zwischen-Update.")
    bullet(pdf, "Screenshot 2026-06-01 at 11.23.30.png — aktueller Juni-2026-Update.")

    section(pdf, "7. DNS-Eintraege (TXT / MX / DKIM)")
    kv(pdf, "apple-domain:", "UQZVo6Fcy7ZYoh6d")
    para(
        pdf,
        "  -> Verifizierungstoken fuer Apple iCloud Custom Email Domain (keine Apple-ID, "
        "nicht oeffentlich einer Person zuordenbar). Zuordnung nur ueber Apple bei behoerdlicher Anfrage.",
    )
    kv(pdf, "SPF:", "v=spf1 include:icloud.com ~all")
    para(pdf, "  -> Versand von @maxhussmann.com nur ueber iCloud-Server erlaubt.")
    kv(pdf, "MX:", "mx01.mail.icloud.com, mx02.mail.icloud.com (Prioritaet 10)")
    para(pdf, "  -> Eingangsmail fuer @maxhussmann.com bei Apple iCloud.")
    kv(pdf, "DKIM CNAME:", "sig1._domainkey -> sig1.dkim.maxhussmann.com.at.icloudmailadmin.com")
    para(
        pdf,
        "  -> Setup vollstaendig verifiziert (nicht nur begonnen). Beweist aktive iCloud-Mail-Konfiguration.",
    )
    kv(pdf, "google-site-verification:", "LfZwRMpLI-UtO1Y1_g2LuIU90Ob6hegkSAcEb3gRKL4")
    para(
        pdf,
        "  -> Verifizierung Google Search Console (SEO). Kein oeffentlicher Personenbezug; "
        "Google kann intern das verknuepfte Google-Konto zuordnen (Legal Request).",
    )

    section(pdf, "8. Website-Inhalt (Kurz, fuer Kontext)")
    bullet(pdf, "Titel/H1 u.a.: IMPORANT UPDATE, Don't become his next victim.")
    bullet(pdf, "Behauptung: Firma durch Max Hussmann um USD 250'000 bei Private-Jet-Deal betrogen.")
    bullet(pdf, "Eingebetteter Screenshot einer Drittseite (Team-Seite) als Beweisbild.")
    bullet(pdf, "Aeltere Abschnitte: Southern Ocean Ltd (UK), Los Angeles (+1 310 866 5855), Sao Paulo.")
    bullet(pdf, "Plattform: Go Daddy Website Builder 8.0; nur eine URL in Sitemap (/).")
    para(
        pdf,
        "Hinweis zu maxhussmann.co/.net/.org: Separate Domains (teilw. 2024 registriert). "
        "maxhussmann.co ist eine WordPress/Divi-Profilseite (WP Engine, blogid 152) — "
        "nicht dieselbe GoDaddy-Website wie maxhussmann.com. Kein direkter Betreiber-Beweis fuer die Warnseite.",
    )

    section(pdf, "9. Empfohlene Auskunftsersuchen (Behoerden)")
    bullet(pdf, "GoDaddy: accountId + websiteId + Zeitfenster 2026-06-01 08:00-14:00 UTC -> Login-IP, Publish-IP, Upload-IP, Rechnungsdaten.")
    bullet(pdf, "GoDaddy Conversations: Kontaktformular-Submissions (contact.apps-api.instantpage.secureserver.net) + Reamaze brandId.")
    bullet(pdf, "Apple/iCloud: apple-domain-Token + Domain maxhussmann.com -> Apple-ID, Custom-Domain-Inhaber.")
    bullet(pdf, "Google: Domain maxhussmann.com + google-site-verification-Token -> Search-Console-Konto.")
    bullet(pdf, "Falls E-Mails vorliegen: vollstaendige RFC822-Header (Received-Zeilen) von/nach @maxhussmann.com sichern.")

    section(pdf, "10. Beweissicherung (empfohlen)")
    bullet(pdf, "archive.org / archive.today Snapshot der gesamten Seite mit Datum.")
    bullet(pdf, "Original-PNG von CDN-URL herunterladen und SHA-256 hash dokumentieren.")
    bullet(pdf, "EXIF/XMP-Export (exiftool) des Bildes archivieren.")
    bullet(pdf, "WHOIS/RDAP und DNS TXT/MX zum selben Zeitpunkt exportieren.")

    section(pdf, "11. Abgrenzung")
    para(
        pdf,
        "Oeffentliche Hosting-IPs (AWS Global Accelerator) identifizieren den Betreiber nicht. "
        "google-site-verification ist kein Personalausweis, sondern ein Verifizierungstoken. "
        "Technische Spuren ermoeglichen gezielte Provider-Anfragen durch die zustaendige Behoerde.",
    )

    pdf.ln(6)
    pdf.set_font("Arial", "I", 9)
    pdf.set_text_color(80, 80, 80)
    para(
        pdf,
        "Dokument erstellt als technische Faktensammlung. Keine aktive Penetration, "
        "keine illegalen Zugriffe. Rechtliche Bewertung durch Staatsanwaltschaft/Anwalt.",
    )

    pdf.output(str(OUT))
    print(OUT)


if __name__ == "__main__":
    main()
