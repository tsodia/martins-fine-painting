# Martin's Fine Painting — Setup Guide

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your environment variables (see below)
npm run dev
```

The site will be running at `http://localhost:3000`.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure each variable:

### Google Sheets API (Lead Pipeline)

Every form submission appends a row to a Google Sheet. To set this up:

1. **Create a Google Cloud project** at [console.cloud.google.com](https://console.cloud.google.com)
2. **Enable the Google Sheets API** in APIs & Services → Library
3. **Create a Service Account:**
   - Go to APIs & Services → Credentials → Create Credentials → Service Account
   - Name it something like `martins-painting-leads`
   - Click "Create and Continue" (no need to grant extra roles)
   - Click "Done"
4. **Generate a key:**
   - Click on the service account you just created
   - Go to the "Keys" tab → Add Key → Create new key → JSON
   - Download the JSON file
5. **Get the credentials from the JSON file:**
   - `GOOGLE_SHEETS_CLIENT_EMAIL` → the `client_email` field
   - `GOOGLE_SHEETS_PRIVATE_KEY` → the `private_key` field (include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
6. **Create a Google Sheet:**
   - Create a new Google Sheet
   - Add headers in Row 1: `Timestamp | Name | Email | Phone | Address | Service Interest | Project Description | How Found Us | Source Page`
   - Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Set `GOOGLE_SHEETS_SPREADSHEET_ID` to this ID
7. **Share the Sheet with the service account:**
   - Click "Share" on the Google Sheet
   - Paste the `client_email` from step 5
   - Give it "Editor" access

### Email Notifications

The site sends email notifications to `msodia@live.com` and `tyler.sodia@outlook.com` for every lead. Configure SMTP:

#### Option A: SendGrid (Recommended)
1. Create a free account at [sendgrid.com](https://sendgrid.com)
2. Go to Settings → API Keys → Create API Key (Full Access)
3. Set your environment variables:
   ```
   EMAIL_SERVICE_API_KEY=SG.your-api-key-here
   EMAIL_FROM_ADDRESS=noreply@martinsfinepainting.com
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   ```
4. Verify your sender identity in SendGrid (Settings → Sender Authentication)

#### Option B: Gmail SMTP
1. Enable 2FA on the Gmail account
2. Generate an App Password (Google Account → Security → App passwords)
3. Set your environment variables:
   ```
   EMAIL_SERVICE_API_KEY=your-app-password
   EMAIL_FROM_ADDRESS=your-gmail@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   ```

#### Option C: Other SMTP Provider
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `EMAIL_SERVICE_API_KEY` to match your provider's SMTP settings.

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Set `GA_MEASUREMENT_ID=G-XXXXXXXXXX`

---

## Deploying to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all environment variables from `.env.local` in the Vercel project settings (Settings → Environment Variables)
4. Deploy

### Custom Domain
1. In Vercel: Settings → Domains → Add your domain
2. Update DNS records as instructed by Vercel
3. SSL is automatic

---

## Project Structure

```
src/
├── app/
│   ├── api/lead/route.ts     → Unified lead pipeline API
│   ├── page.tsx              → Home page
│   ├── services/page.tsx     → Services page
│   ├── about/page.tsx        → About page
│   ├── gallery/page.tsx      → Gallery / Our Work page
│   ├── contact/page.tsx      → Contact page
│   └── layout.tsx            → Root layout (fonts, metadata, GA)
├── components/
│   ├── Header.tsx            → Sticky navigation
│   ├── Footer.tsx            → Site footer
│   ├── QuoteModal.tsx        → Quote request modal
│   ├── FadeIn.tsx            → Scroll animation wrapper
│   ├── BeforeAfter.tsx       → Before/after image slider
│   └── FAQ.tsx               → Accordion FAQ component
└── public/images/gallery/    → Project photos
```

---

## Adding Real Photos

Replace gallery images in `public/images/gallery/`. Recommended:

- **Format:** JPG or WebP
- **Size:** 1200x900px minimum for gallery grid, 1600x1200px for before/after sliders
- **Naming:** Use descriptive kebab-case names (e.g., `cherry-hills-kitchen-cabinets.jpg`)
- Update the image references in `src/app/gallery/GalleryGrid.tsx` and `src/app/gallery/page.tsx`

### Adding Martin's Photo
Replace the placeholder on the About page by adding a photo to `public/images/` (e.g., `martin-portrait.jpg`) and updating `src/app/about/page.tsx` to use a `next/image` `<Image>` component instead of the placeholder div.

---

## Lead Pipeline Columns

The Google Sheet will receive rows with these columns:

| Column | Description |
|--------|-------------|
| Timestamp | Date/time in Mountain Time |
| Name | Lead's full name |
| Email | Lead's email address |
| Phone | Lead's phone number |
| Address | Address or zip code (contact form only) |
| Service Interest | Selected service type |
| Project Description | Free-text project details |
| How Found Us | Referral source (contact form only) |
| Source Page | Which page/form generated the lead |
