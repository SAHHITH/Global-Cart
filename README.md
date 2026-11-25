```markdown
# Global Cart — Smart Marketplace

A modern, responsive, 100% frontend e-commerce marketplace built with **React 19**, **Vite**, **Tailwind CSS**, and **Zustand** (`localStorage` persistence). **Global Cart** features a startup authentication flow, dual-tier marketplace navigation, Indian Rupee (`₹`) pricing across 10 departments, a 3-step checkout experience, live warehouse-to-customer order tracking, and an interactive merchant analytics console.

![React](https://img.shields.io/badge/React-19-171717?style=for-the-badge&logo=react&logoColor=A31C1B)
![Vite](https://img.shields.io/badge/Vite-6-06110C?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-171717?style=for-the-badge&logo=tailwindcss&logoColor=A31C1B)
![Zustand](https://img.shields.io/badge/State-Zustand_Persist-A31C1B?style=for-the-badge)

---

## Key Features

- **Startup Authentication Gate (`/login`):** Launches with a dedicated Sign In / Create Account experience persisted via `localStorage`, complete with one-click **Shopper** and **Admin** demo login options.
- **Dual-Tier Navigation Architecture:**
  - **Main Header:** Brand logo, category-scoped live search bar, **Light / Dark / System** theme switcher, direct **About** and **Contact** links, live **Orders**, **Wishlist**, and **Cart** counters, plus an **Account** dropdown menu containing the **Admin Dashboard** and **Sign Out** actions.
  - **Secondary Category Strip:** Quick-access department links alongside **Home**, **All Products**, **Categories**, and **Today’s Offers (`HOT`)**.
- **Multi-Category Catalog & INR (`₹`) Pricing:**
  - **48+ curated products** across **10 departments** (*Electronics, Fashion, Home & Kitchen, Beauty, Sports, Accessories, Books & Stationery, Toys & Gaming, Groceries & Gourmet, Automotive & Tools*) and **25+ brands**.
  - Full `en-IN` Rupee (`₹`) formatting, brand & category badges, star ratings, Quick View modal, and detailed product specification tabs.
- **Real-Time Filtering, Cart & Promo Engine:**
  - Filter by department, brand, minimum customer rating, stock availability, and an interactive `₹0 – ₹2,00,000` price range slider.
  - Persistent Shopping Cart and Wishlist with automatic free delivery on orders **₹999+** (`₹79` delivery fee below `₹999`) and live promo code validation (`WELCOME15`, `GLOBAL10`, `SAVE500`).
- **3-Step Checkout & Warehouse-to-Customer Tracking (`/orders`):**
  - Material UI `Stepper` checkout covering **Shipping Address**, **Simulated Payment Method** (*Card*, *Global Pay Wallet*, *Pay on Delivery*), and **Order Review**.
  - Dedicated **Ordered Details** page displaying itemized `₹` payment receipts and a 5-stage **Warehouse-to-Customer** shipment tracker (*Order Confirmed → Packed at Warehouse → Dispatched from Warehouse → Out for Delivery → Delivered to Customer*) with an interactive **"Simulate Next Transit Step"** control.
- **Merchant & Analytics Console (`/admin`):**
  - Real-time KPI cards, **Recharts** 6-month revenue area chart and category valuation bar chart, plus an **Ant Design** inventory table to add or remove live catalog SKUs.

---

## Color System & Theme Modes

Global Cart supports **Light**, **Dark**, and **System** themes powered by CSS custom properties and a 3-color brand palette:

| Token | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| `--brand-charcoal` | **Charcoal Black** | `#171717` | Main top header, footer surface, light-mode primary text, dark-mode cards & modals |
| `--brand-forest` | **Forest Green** | `#06110C` | Secondary category navbar, announcement strip, hero gradients, dark-mode canvas |
| `--brand-crimson` | **Crimson Red** | `#A31C1B` | Primary CTAs (*Add to Cart*, *Buy Now*, *Checkout*), active states, badges, ratings & charts |

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Core & Routing** | React 19, Vite, React Router DOM |
| **Styling & Motion** | Tailwind CSS (`@tailwindcss/vite`), CSS Variables, Framer Motion, Lucide React |
| **Component Libraries** | Material UI (`Rating`, `Stepper`), Ant Design (`Table`, `Tag`, `Popconfirm`, `Slider`) |
| **Data Visualization** | Recharts (`AreaChart`, `BarChart`, `ResponsiveContainer`) |
| **State & Persistence** | Zustand (`persist` middleware with browser `localStorage`), React Toastify |

---

## Project Structure

```text
global-cart/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── cart/           # CartDrawer, CartItem, CartSummary, CouponInput
│   │   ├── common/         # Breadcrumbs, Button, EmptyState, PriceDisplay, RatingStars
│   │   ├── home/           # HeroSection, CategorySection, DealOfTheDay, BrandShowcase
│   │   ├── layout/         # AnnouncementBar, Header, Navbar, Footer, MainLayout
│   │   ├── product/        # ProductCard, ProductFilters, ProductGallery, ProductGrid
│   │   ├── ui/             # Dialog, DropdownMenu, Sheet, Tabs
│   │   └── wishlist/       # WishlistButton, WishlistItem
│   ├── data/               # banners.js, categories.js, navigation.js, offers.js, products.js
│   ├── features/
│   │   ├── auth/           # authStore.js
│   │   ├── cart/           # cartStore.js
│   │   ├── products/       # productStore.js
│   │   ├── theme/          # ThemeProvider.jsx, ThemeSwitcher.jsx, themeStore.js
│   │   └── wishlist/       # wishlistStore.js
│   ├── hooks/              # useCart.js, useDebounce.js, useProducts.js, useWishlist.js
│   ├── pages/              # Login, Home, Products, ProductDetails, Categories, Orders, Checkout, AdminDashboard, etc.
│   ├── routes/             # AppRoutes.jsx
│   ├── styles/             # index.css
│   ├── utils/              # formatPrice.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js

```

---

## Getting Started

### 1. Navigate to the Project Directory

```bash
cd global-cart

```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps

```

### 3. Start the Development Server

```bash
npm run dev

```

Open `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
npm run build

```

---

## Demo Guide & Promo Codes

* **Instant Sign-In:** On the startup `/login` screen, use **Continue as Shopper** or **Sign In as Admin** for one-click access, or register with any name, email, and password.
* **Active Promo Codes (Cart & Checkout):**
* `WELCOME15` — **15% OFF** your entire order
* `GLOBAL10` — **10% OFF** on orders **₹2,000** and above
* `SAVE500` — Flat **₹500 OFF** on orders **₹5,000** and above


* **Live Shipment Simulation:** Navigate to **Orders** (`/orders`) in the top header and click **Simulate Next Transit Step** on any active shipment to watch it progress from the fulfillment warehouse to customer delivery.

---

## Application Routes

| Route | Page | Description |
| --- | --- | --- |
| `/login` | **Login / Sign Up** | Startup authentication gate with demo access |
| `/` | **Home** | Hero carousel, category strip, Deal of the Day, featured catalog & brands |
| `/products` | **All Products** | Full catalog with multi-facet filters (`₹` range, brand, rating) & sorting |
| `/products/:id` | **Product Details** | Image gallery, technical specs table, customer reviews & related items |
| `/categories` | **Categories** | Directory of all 10 shopping departments |
| `/categories/:slug` | **Category Details** | Department banner and filtered product listing |
| `/search` | **Search Results** | Keyword and category-scoped search results |
| `/cart` | **Shopping Cart** | Item quantity controls, promo code box & INR breakdown |
| `/wishlist` | **Wishlist** | Saved items with one-click move to cart |
| `/checkout` | **Checkout** | 3-step MUI Stepper checkout flow |
| `/order-success` | **Order Confirmation** | Order reference receipt after checkout |
| `/orders` | **Ordered Details** | Payment receipt & 5-stage warehouse-to-customer shipment tracker |
| `/offers` | **Today’s Offers** | Copyable promo codes & top discounted products |
| `/about` | **About Us** | Platform overview and architecture highlights |
| `/contact` | **Contact Support** | Customer support hub and inquiry form |
| `/admin` | **Admin Dashboard** | Revenue/inventory Recharts analytics & Ant Design SKU manager |

---

## Author

Developed by **G Shahith**

```

```
