# PLG Gridders Website — Setup Guide
## plgridders.com

This is your complete, self-hosted website. Zero monthly fees beyond your domain (~$10/yr).

---

## ✅ What's Included

| File | Purpose |
|------|---------|
| `index.html` | Your main public website |
| `admin.html` | Visual tool to update config without touching code |
| `SETUP.md` | This guide |

---

## 🚀 1. Deploy to Cloudflare Pages (One-Time Setup)

**Step 1 — Push to GitHub**
1. Log into github.com → your repo (or create one at github.com/new)
2. Upload `index.html` and `admin.html` to the repo root
3. Commit the files

**Step 2 — Connect to Cloudflare Pages**
1. Go to dash.cloudflare.com → **Pages** → **Create a project**
2. Click **Connect to Git** → authorize GitHub → select your repo
3. Build settings: leave everything blank (no build command needed — static HTML)
4. Click **Save and Deploy**
5. Your site goes live at a `*.pages.dev` URL immediately

**Step 3 — Connect your domain (plgridders.com)**
1. In Cloudflare Pages → your project → **Custom Domains** → Add `plgridders.com`
2. Since your domain is on Cloudflare, DNS updates automatically
3. Done — site is live at plgridders.com within minutes

> **Every time you push a change to GitHub, the site updates in ~30 seconds automatically.**

---

## 🛠 2. One-Time Service Setup

### Stripe (Payments)
1. Create account at **stripe.com** (free)
2. Go to **Payment Links** → Create a new link for each division
   - Set the price to match each division fee
   - Add your club name and description
   - Optional: add custom fields for player name/age
3. Enable receipts: **Settings → Emails → Successful payments → ON**
   - Stripe will automatically email a PDF receipt to every parent after payment
4. Paste the 3 links into `admin.html` → Stripe Links section → Generate config
5. You see all registrations in your Stripe dashboard, with export to CSV

### Formspree (Contact Form)
1. Create a free account at **formspree.io**
2. Click **New Form** → name it "PLG Inquiry"
3. Set the notification email (who gets alerted on each inquiry)
4. Copy the **Form ID** (8 characters) from the form settings page
5. Paste it into `admin.html` → Forms section → Generate config

> **To also log form submissions to Google Sheets:** Set up a free Zapier (zapier.com) automation: Formspree → Google Sheets. Takes 5 minutes.

### Google Sheets (Schedule, News, Teams)
1. Create a new Google Sheet at **sheets.google.com**
2. Create **3 tabs** named exactly: `Schedule`, `News`, `Teams`
3. Add the column headers from the table below to **Row 1** of each tab
4. **File → Share → Publish to web** → Entire document → CSV → Publish
5. Copy the Sheet ID from the URL and paste it in `admin.html` → Google Sheets

**Schedule tab columns (Row 1 — copy exactly):**
```
Opponent | Week | Team | Result | Date | Location | Status | Home
```

**News tab columns:**
```
Title | Date | Badge | Body | Link | LinkText
```

**Teams tab columns:**
```
Name | Level | Coach | Practice | Focus | Badge | Chip | Roster
```

---

## ✏️ 3. Updating the Site Each Season

### For schedule, news, and team info (anyone can do this):
1. Open your Google Sheet
2. Edit, add, or remove rows
3. Done — site updates within 5 minutes automatically

### For fees, Stripe links, tryout dates, contact info:
1. Open `admin.html` in your browser
2. Password: `gridders2026` ← **change this before going live** (edit line ~400 in admin.html)
3. Update the relevant fields
4. Click **Generate Config Code**
5. Click **Copy to Clipboard**
6. Go to github.com → your repo → click `index.html` → click the ✏️ pencil (Edit)
7. Find the `SITE_CONFIG` block at the top (between the two comment lines)
8. Select all of it and paste your new config
9. Click **Commit changes** → site updates in ~30 seconds

---

## 💰 Cost Summary

| Service | Cost |
|---------|------|
| Cloudflare Pages hosting | **Free forever** |
| Cloudflare domain (plgridders.com) | ~$10/year |
| Google Sheets CMS | **Free** |
| Formspree (up to 50 submissions/month) | **Free** |
| Formspree unlimited | $10/month |
| Stripe | **Free** — 2.9% + 30¢ per transaction only |
| Zapier (Formspree → Sheets) | Free tier (100 tasks/mo) |
| **Total** | **~$10/year** |

**Compared to Wix:** Wix charges $17–$35/month = $204–$420/year. You save $190–$410 per year.

---

## 🔒 Security Notes

- Change the `admin.html` password before going live
- The admin panel is client-side only (no backend) — determined users can bypass it
- For higher security, add Cloudflare Access protection to `/admin.html` (free with Cloudflare)
- Never put real API keys or secrets in the HTML files — Stripe Payment Links are safe to expose

---

## 📞 Quick Reference

| Task | How |
|------|-----|
| Update game schedule | Edit Google Sheet → Schedule tab |
| Post news update | Edit Google Sheet → News tab |
| Update team rosters | Edit Google Sheet → Teams tab |
| Change fees | admin.html → Registration → Generate → Paste |
| Update Stripe links | admin.html → Stripe Links → Generate → Paste |
| Change contact info | admin.html → Organization → Generate → Paste |
| Add photos | Replace gallery img src URLs in index.html |
| Turn off registration | admin.html → Registration → toggle OFF → Generate → Paste |

---

*Generated for PLG Gridders · plgridders.com*
