# Fine Fit Website — Developer Setup Guide

## Tech Stack
- React 18 + Vite
- CSS Modules (no Tailwind, no CSS-in-JS)
- EmailJS (email submissions)
- Deployed via Vercel

---

## 1. Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free tier is fine)

---

## 2. Local Development

```bash
# Navigate to the project
cd C:\projects\finefit-website

# Install dependencies
npm install

# Start development server (opens at http://localhost:5173)
npm run dev
```

---

## 3. Add the Logo & Placeholder Images

Place these files in `/public/images/`:
- `placeholder-lifestyle.jpg` — any full-height placeholder (600x800px)
- `placeholder-thumb.jpg`    — any square placeholder (400x400px)

Real product photos follow the naming convention:
- `/public/images/security/SEC-COM-001-lifestyle.jpg`
- `/public/images/security/SEC-COM-001-thumb.jpg`

Then update the `lifestyleImage` and `thumbImage` fields in `src/data/products.js`.

---

## 4. EmailJS Setup (optional but recommended)

1. Go to https://www.emailjs.com and create a free account
2. Create an Email Service (Gmail or Outlook)
3. Create an Email Template with these variables:
   - `{{customer_name}}`
   - `{{customer_phone}}`
   - `{{customer_company}}`
   - `{{customer_email}}`
   - `{{items}}`
   - `{{message}}`
4. Copy your Service ID, Template ID, and Public Key
5. Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note:** If EmailJS is not configured, the WhatsApp flow still works perfectly on its own.

---

## 5. GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: Fine Fit website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/finefit-website.git
git push -u origin main
```

---

## 6. Vercel Deployment

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework: **Vite** (auto-detected)
5. Add Environment Variables (from your .env file)
6. Click Deploy

Every `git push` to `main` auto-deploys to Vercel.

---

## 7. Adding New Products

Open `src/data/products.js` and add a new object to the `PRODUCTS` array:

```js
{
  id: 'SEC-COM-005',          // Unique SKU
  category: 'security',       // 'security' | 'ppe'
  subcategory: 'combat',      // See CATEGORIES in same file
  name: 'Product Name',
  description: 'Full description...',
  features: ['Feature 1', 'Feature 2'],
  colours: ['black', 'navy'], // Keys from COLOUR_OPTIONS
  sizes: SIZE_OPTIONS,        // Or custom array e.g. ['5','6','7']
  lifestyleImage: '/images/security/SEC-COM-005-lifestyle.jpg',
  thumbImage: '/images/security/SEC-COM-005-thumb.jpg',
  priceOnRequest: true,
},
```

---

## 8. File Structure

```
finefit-website/
├── public/
│   ├── logo.webp                  ← Approved logo (do not alter)
│   └── images/
│       ├── placeholder-lifestyle.jpg
│       ├── placeholder-thumb.jpg
│       ├── security/              ← Product photos go here
│       └── ppe/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── CategoryNav/
│   │   ├── ProductGrid/
│   │   ├── ProductModal/          ← Product popup
│   │   ├── QuoteCart/             ← Enquiry cart drawer
│   │   ├── Footer/
│   │   └── WhatsAppFAB/
│   ├── data/
│   │   └── products.js            ← ADD/EDIT PRODUCTS HERE
│   ├── hooks/
│   │   ├── useCart.js
│   │   └── useScrollReveal.js
│   ├── utils/
│   │   └── whatsapp.js            ← WA number lives here
│   ├── styles/
│   │   ├── tokens.css             ← Design system (colours, fonts, spacing)
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .env                           ← Local only, not committed
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── SETUP.md                       ← You are here
```
