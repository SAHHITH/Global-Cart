# 🛒 Global Cart – E-Commerce Website

A modern, responsive e-commerce frontend built with React and Vite, inspired by the shopping experiences of Amazon and Flipkart.

Global Cart provides a seamless online shopping interface with product discovery, category browsing, shopping cart management, wishlist functionality, theme switching, and a simulated checkout experience.

The project focuses on delivering a premium UI/UX design using modern frontend technologies and multiple UI component libraries.

---

## 🌟 Features

### 🏠 Homepage
- Modern promotional hero section
- Featured and trending products
- Product category showcase
- Deal of the day section
- Promotional banners
- Brand showcase

### 🛍️ Product Management
- Product listing and product details pages
- Product image gallery
- Product search functionality
- Category-based filtering
- Price range filtering
- Brand filtering
- Rating-based filtering
- Product sorting
- Discount and bestseller badges

### 🛒 Shopping Cart
- Add products to cart
- Remove products from cart
- Increase and decrease product quantity
- Automatic subtotal calculation
- Cart drawer and cart page
- Coupon code interface
- Cart data persistence using LocalStorage

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View saved products
- Wishlist persistence using LocalStorage

### 🎨 Theme Management
- Light theme
- Dark theme
- System theme
- Persistent theme preferences
- Smooth theme transitions

### 📦 Checkout
- Frontend checkout form
- Customer and delivery information
- Order summary
- Form validation
- Simulated order confirmation

### 📊 Admin Dashboard
- Mock sales analytics
- Product statistics
- Revenue overview
- Sales charts
- Product management interface

### 📱 Responsive Design
- Desktop, tablet, and mobile support
- Responsive product grid
- Mobile navigation
- Sticky header
- Smooth animations
- Accessible UI elements

---

## 🎨 Design System

Global Cart uses a premium marketplace-inspired design system.

| Color | Hex Code | Usage |
|---|---|---|
| Midnight Navy | `#101828` | Primary background |
| Marketplace Orange | `#FF9900` | Primary buttons and highlights |
| Commerce Blue | `#2874F0` | Links and active states |
| Cloud White | `#F5F7FA` | Light theme background |

The interface combines clean typography, consistent spacing, rounded cards, subtle shadows, and smooth interactions.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### UI Libraries
- Tailwind CSS
- shadcn/ui
- Material UI
- Ant Design

### Styling and Animations
- Framer Motion
- CSS Variables
- Responsive CSS

### State Management
- Zustand
- LocalStorage

### Routing
- React Router DOM

### Icons
- Lucide React
- Material UI Icons

### Charts
- Recharts

### Notifications
- React Toastify

---

## 📁 Project Structure

```text
global-cart/
├── public/
│   ├── images/
│   │   ├── banners/
│   │   ├── categories/
│   │   └── placeholders/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── common/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── home/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Offers.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   │
│   ├── features/
│   │   ├── theme/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   └── products/
│   │
│   ├── data/
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── banners.js
│   │   └── offers.js
│   │
│   ├── hooks/
│   ├── utils/
│   ├── routes/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
└── DESIGN.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/SAHHITH/Global-Cart.git
```

### 2. Navigate to the project directory

```bash
cd Global-Cart
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 💾 Data Storage

This project is frontend-only and does not require a backend server or database.

The application uses:

- Mock product data stored in JavaScript files
- LocalStorage for cart persistence
- LocalStorage for wishlist persistence
- LocalStorage for theme preferences
- Mock data for dashboard analytics

All checkout operations are simulated and do not process real payments.

---

## 🧩 Main Components

The application includes reusable components such as:

1. Header
2. Navbar
3. HeroSection
4. CategorySection
5. ProductCard
6. ProductGrid
7. ProductFilters
8. ProductSort
9. ProductDetails
10. CartDrawer
11. CartSummary
12. WishlistButton
13. DealOfTheDay
14. ThemeToggle
15. Footer
16. Checkout
17. AdminDashboard

---

## 🔮 Future Enhancements

- Backend integration using Node.js and Express
- MongoDB product database
- User authentication
- Real-time inventory management
- Payment gateway integration
- Order tracking
- Product recommendations using AI
- Admin product management
- Cloud deployment
- Progressive Web App support

---

## 🎯 Project Objective

The objective of Global Cart is to develop a modern e-commerce frontend that demonstrates practical knowledge of React, component-based architecture, state management, responsive UI design, theme customization, and frontend application development.

This project is designed as a portfolio project to showcase frontend development skills and modern e-commerce UI/UX implementation.

---

## 👨‍💻 Developer

**G Shahith**

B.E. Computer Science and Engineering (AI & ML)

Mohamed Sathak A.J. College of Engineering

Chennai, India

---

## 📄 License

This project is created for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star on GitHub!
