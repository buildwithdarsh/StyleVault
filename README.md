> This project is made with the help of Claude (1M context).

# StyleVault

India's curated boutique fashion marketplace — connecting 500+ verified boutiques across 50+ cities.

## Overview

StyleVault helps customers discover handwoven sarees, bridal lehengas, custom-tailored ethnic wear, and book styling consultations. Offers same-day delivery in metros and personalized style recommendations through a quiz-driven onboarding flow.

## Features

- **Boutique catalog** — Search and browse by location, price, style
- **Custom tailoring** — Order tailored ethnic wear with measurements
- **Bridal lehenga collection** — Curated wedding wear
- **Cart + checkout** — Smooth purchasing flow
- **Order tracking** — Real-time status with same-day metro delivery
- **Stylist appointments** — Book consultations with verified stylists
- **Customer dashboard** — Orders, wishlist, saved boutiques
- **Style quiz** — Personalized recommendations
- **Subscription tiers** — Premium memberships with perks

## Tech Stack

- **Framework:** Next.js 16.2, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **SDK:** @buildwithdarsh/sdk

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Live: [stylevault.work.withdarsh.com](https://stylevault.work.withdarsh.com)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
app/
├── HomeClient.tsx     # Hero, category carousel, personalization
├── boutiques/         # Boutique listings
├── bridal/            # Bridal collection
├── appointments/      # Stylist booking
├── tailor/            # Custom tailoring
├── subscription/      # Premium tiers
└── static/            # Images, logos
```
