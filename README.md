# 🏥 E-Pharmacy - Online Medicine Store

A modern, full-featured e-commerce platform for purchasing medicines and healthcare products online. Built with React, Redux Toolkit, and integrated with a robust backend API.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://e-pharmacy-mhkp.vercel.app)
[![Backend API](https://img.shields.io/badge/API-running-blue.svg)](https://e-pharmacy-backend-7d06.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Performance Optimizations](#performance-optimizations)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## ✨ Features

### 🛒 Core Features

- **Product Catalog**: Browse medicines by category with advanced filtering
- **Search & Filter**: Find products quickly with search and category filters
- **Shopping Cart**: Add, update quantities, and manage cart items
- **Checkout System**: Complete orders with shipping details and payment options
- **User Authentication**: Secure login/register system with JWT tokens
- **Product Details**: Detailed product information with reviews and descriptions
- **Store Locator**: Find nearest medicine stores

### 💫 User Experience

- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Loading States**: Smooth loading indicators and suspense fallbacks
- **Toast Notifications**: Real-time feedback for user actions
- **404 Page**: Custom not-found page with navigation
- **Persistent Cart**: Cart items saved using Redux Persist
- **Form Validation**: Client-side validation with Formik & Yup

### 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface
- **Mobile Menu**: Hamburger menu for mobile/tablet devices
- **Product Cards**: Beautiful product showcase with images
- **Review System**: Customer reviews and ratings

## 🛠 Tech Stack

### Frontend

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing with lazy loading
- **Formik** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client
- **Redux Persist** - Persistent state
- **React Toastify** - Toast notifications
- **React Responsive** - Responsive utilities
- **React Paginate** - Pagination
- **React Select** - Select dropdown
- **CSS Modules** - Scoped styling

### Build Tools

- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Git** - Version control

### Backend

- **Backend API**: [https://e-pharmacy-backend-7d06.onrender.com](https://e-pharmacy-backend-7d06.onrender.com)
- RESTful API with JWT authentication
- Product management and cart operations
- User authentication and authorization
- Order processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/salptkin/E-Pharmacy.git
cd E-Pharmacy
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**

```
http://localhost:5173
```

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://e-pharmacy-backend-7d06.onrender.com
```

## 📁 Project Structure

```
E-Pharmacy/
├── public/
│   ├── images/           # Static images
│   └── fonts/            # Font files
├── src/
│   ├── components/       # React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Home/
│   │   ├── Medicine/
│   │   ├── Cart/
│   │   ├── ProductDetail/
│   │   └── ...
│   ├── pages/           # Page components (lazy loaded)
│   │   ├── HomePage/
│   │   ├── MedicinePage/
│   │   ├── CartPage/
│   │   └── ...
│   ├── redux/           # Redux store and slices
│   │   ├── auth/        # Authentication slice
│   │   ├── pharmacy/    # Pharmacy/products slice
│   │   └── store.js     # Redux store configuration
│   ├── schemas/         # Validation schemas
│   ├── data/            # Mock data
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── vercel.json          # Vercel deployment config
└── package.json
```

## 🔌 API Integration

### Base URL

```javascript
const BASE_URL = "https://e-pharmacy-backend-7d06.onrender.com/api";
```

## ⚡ Performance Optimizations

### Code Splitting

- **Lazy Loading**: All page components are lazy loaded
- **Bundle Size**: Reduced initial bundle from 606 KB to 379 KB (-37.5%)
- **Chunk Splitting**: Separate chunks for each page

### Before Optimization

```
Bundle size: 606.82 kB (gzip: 197.28 kB)
```

### After Optimization

```
Initial bundle: 378.87 kB (gzip: 125.63 kB)
+ Separate chunks for each page (0.57 KB - 92.92 KB)
```

### Other Optimizations

- Redux Persist for cart persistence
- Optimistic UI updates
- Debounced search inputs
- Memoized components (where needed)
- CSS Modules for scoped styles
- Gzip compression on Vercel

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Build Output

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use ES6+ syntax
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure code passes linting (`npm run lint`)
- Test your changes before submitting

## 👥 Author

**Samet Alptekin Eroğlu**

- GitHub: [@salptkin](https://github.com/salptkin)
- LinkedIn: [Samet Alptekin Eroğlu](https://www.linkedin.com/in/salptekineroglu)

## 🙏 Acknowledgments

- Backend API: [E-Pharmacy Backend](https://e-pharmacy-backend-7d06.onrender.com)
- Icons: Custom SVG sprite
- Fonts: Inter font family
- Design inspiration from modern e-commerce platforms

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by [Samet Alptekin Eroğlu](https://github.com/salptkin)
