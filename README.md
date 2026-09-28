# Ladies Golf Association of Nigeria (LGAN) — Digital Association Platform

> **The Premier Enterprise SaaS Management, Tournament, Membership, and Marketplace Ecosystem for Nigerian Women's Golf.**
> Proud Host of the **2026 All Africa Challenge Trophy (AACT)** in Abuja.

---

## 🌟 Executive Overview

The **Ladies Golf Association of Nigeria (LGAN)** digital platform is a modern, full-stack, enterprise-grade association management ecosystem designed to govern, administer, and develop ladies' golf across Nigeria.

The platform provides unified digital infrastructure for:
1. **1,500+ Female Golfers** across all 36 Nigerian states and the FCT.
2. **50+ Affiliated Golf Clubs** across 6 Geopolitical Administrative Zones.
3. **Golf Pro Shop Vendors** selling equipment, authentic apparel, and tournament memorabilia.
4. **Super Administrators & National Executive Committee (NEC)** directing national governance, WHS handicapping, championship draws, and treasury operations.

---

## 🚀 Key Features

### 1. 🎖️ 4-Tier Role-Based Portals
- **Super Admin Portal (`/admin`)**: Executive KPI overview, member/club/vendor moderation, Paystack reconciliation ledger, tournament management, national broadcast announcements, and system settings.
- **Member Golfer Portal (`/dashboard`)**: Personal profile, dynamic 3D Digital Membership Card with cryptographic QR code verification, instant Paystack annual dues renewal (₦5,000/yr), World Handicap System (WHS) scorecard submission, and pro shop order tracking.
- **Club Admin Portal (`/club`)**: Institutional profile, ladies' section roster management (CSV export), annual club affiliation dues (₦25,000/yr), tournament hosting bids, and compliance certificates.
- **Vendor Marketplace Portal (`/vendor`)**: Product catalog management, inventory tracking, order fulfillment with courier waybills, earnings dashboard, and Paystack bank payouts (net of 10% LGAN platform commission).

### 2. 💳 Paystack Payment Integration
- Automated checkout modal supporting **Debit/Credit Cards (Mastercard, Visa, Verve)**, **Bank Transfers**, and **USSD**.
- Direct dues activation with automated electronic PDF tax receipts.
- Standardized reference prefixes (`DUES_`, `CLUB_`, `ORD_`, `TOUR_`) with webhook handlers (`/api/paystack/webhook`).

### 3. 🛡️ Cryptographic Digital Membership Card & QR Verification
- Real-time verification scanner at `/verify/[LGAN-ID]` providing public authenticity validation for tournament marshals, club pro shops, and international delegations.
- High-resolution 3D card with front/back flip animations, metallic gold badges, and Apple Wallet / Google Wallet pass readiness.

### 4. ⛳ 2026 Championship Fixtures & Live Scoring
- Dedicated coverage for the **2026 All Africa Challenge Trophy (AACT)** hosted at IBB International Golf & Country Club, Abuja.
- Real-time tournament leaderboard supporting **Gross vs. Net Scoring (WHS)**, flight filters, and round-by-round differentials.

### 5. 🛍️ Golf Pro Shop Marketplace
- Curated golf apparel, clubs, golf balls, and commemorative merchandise.
- Shopping bag state persistence, 10% platform commission retention, and courier tracking.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide-React.
- **Backend / Database:** Next.js Server Route Handlers, Prisma ORM, PostgreSQL.
- **Payments:** Paystack Payment Gateway API & Webhook Handler.
- **Hosting & CI/CD:** Vercel Optimized, GitHub repository ready.

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-org/lgan-digital-platform.git
cd lgan-digital-platform
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Required variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lgan_db?schema=public"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_aact2026_lgan_digital_gateway"
PAYSTACK_SECRET_KEY="sk_test_secret_key_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ 1-Click Role Switcher Demo

To test and review all four user personas without manual relogging, use the **Simulate Role** dropdown located in the top navigation bar or the 1-click login cards on the `/login` page:
- **Super Admin:** Dr. (Mrs.) Lami O. Ahmed (`admin@lgan.org.ng`)
- **Member Golfer:** Evelyn Oyome (`evelyn.oyome@gmail.com`)
- **Club Admin:** Lady Captain Victoria Nnamani (`ladies.section@ibbgolfclub.org.ng`)
- **Vendor / Merchant:** Mrs. Ngozi Okonkwo (`sales@fairwaygolf.ng`)

---

## 🌐 Production Deployment on Vercel

1. Push this repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Set the Environment Variables (`DATABASE_URL`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`).
4. Deploy!

---

## 🏛️ Association Secretariat

**Ladies Golf Association of Nigeria (LGAN)**  
National Secretariat: IBB International Golf & Country Club, Maitama, Abuja FCT, Nigeria  
- Email: `secretariat@lgan.org.ng` / `info@lgan.org.ng`  
- Phone: `+234 (0) 803 311 9842` / `+234 (0) 802 304 8812`  
- Affiliated with: Nigeria Golf Federation (NGF), Golf Union of Africa (GUA), R&A St Andrews.
