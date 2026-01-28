Bienderen SDG Dashboard - Documentatie

Inhoud
- Introductie
- Installatie & lokaal draaien
- Projectstructuur
- Belangrijke componenten
- API endpoints
- Environment variables
- Deploy instructies
- Contact / support

---

Introductie
Dit project is het Bienderen SDG Dashboard: een Next.js + TypeScript applicatie met Tailwind CSS, bedoeld om SDG-data te visualiseren en filters, favorieten en exports aan te bieden.

Installatie & lokaal draaien
1. Clone de repository
2. Installeer dependencies: `npm install`
3. Kopieer `.env.example` naar `.env` en vul vereiste variabelen in (zie Environment variables).
4. Run dev-server: `npm run dev`

Projectstructuur (belangrijk)
- `app/` — Next.js app routes en pagina's
- `components/` — herbruikbare UI-componenten (chatbot, charts, ui)
- `lib/` — helper utilities en DB connecties
- `prisma/` — Prisma schema en seed
- `public/docs/` — documentatie en statische assets

Belangrijke componenten
- `components/chatbot.tsx` — eenvoudige clientside chat UI met quick-options
- `components/charts/` — grafiekcomponenten (BarChart, LineChart)
- `app/ondersteuning/page.tsx` — Ondersteuning pagina met live chat, e-mail en docs

API endpoints
- `app/api/support/route.ts` — (optioneel) server endpoint om support e-mails te sturen (SMTP of SendGrid)

Environment variables
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — SMTP instellingen
- SENDGRID_API_KEY, SENDGRID_FROM — alternatieve email provider
- SUPPORT_TO_EMAIL — e-mail ontvanger voor support

Deploy instructies
- Build en deploy als een standaard Next.js app. Zorg dat .env variabelen beschikbaar zijn op de server.
- Voor e-mailing: configureer SendGrid of SMTP op je hosting provider.

Contact / support
Voor vragen over het project, neem contact op met het supportteam (zie Ondersteuning-pagina in de app).

---

Kleuren van de website
- Primair (gradient): from-purple-500 to-purple-600 — hex ongeveer #7C3AED → #6D28D9 (gebruik voor knoppen, highlights).
- Donkere achtergrond: bg-navy-900 / #0F172A (pagina-achtergrond en kaarten).
- Tekst: light-text / #E6EEF8 voor koppen en #CBD5E1 voor body-tekst.
- Accent: cyan / #06B6D4 (links, accentknoppen, iconen).
- Neutrals: bg-navy-800 / #0B1220 voor inputs en panelen; borders: purple-600/30.
- Gebruik: gebruik het gradient voor primaire acties, donkere tinten voor panels/achtergrond en cyan voor accentuering en links.
