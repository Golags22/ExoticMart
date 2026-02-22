// routes.js
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import MainLayout from "../layouts/Minlayout";
import { Login } from "../account/auth";
import Signup from "../account/auth/signup";
import ProductDetail from "../components/ProductDetails";
import CategoryPage from "../components/CategoryPage";

// Icons for banners
import { Sparkles, Gem, Flower2 } from "lucide-react";
import Cart from "../pages/Cart/Cart";
import Profile from "../account/customer/profile";
import { Orders } from "../account/customer";
import { Checkout, OrderConfirmation } from "../pages/checkout";
import { AdminDashboard, AdminOrder, AdminProducts} from "../account/admin/pages";
import { AdminLayout } from "../layouts";
import AdminRoute from "./AdminRoute";
import { AdminLogin, AdminOrders, AdminSignup } from "../account/admin/pages/auth";


AdminOrders
// ============================================
// 1. ROUTES CONFIGURATION
// ============================================
export const routes = [
  // Visible Routes
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
    showInNav: true,
    title: "Home",
  },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
    showInNav: true,
    title: "About",
  },
  {
    path: "/contact",
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
    showInNav: true,
    title: "Contact",
  },
  {
    path: "/cart", // Fixed: lowercase
    element: (
      <MainLayout>
        <Cart />
      </MainLayout>
    ),
    showInNav: false,
  },
  {
    path: "/profile", // Fixed: lowercase
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    ),
    showInNav: false,
  },
  {
    path: "/account/orders",
    element: (
      <MainLayout>
        <Orders />
      </MainLayout>
    ),
    showInNav: false,
  },

  // Product Detail (MUST come before dynamic routes)
  {
    path: "/product/:id",
    element: (
      <MainLayout>
        <ProductDetail />
      </MainLayout>
    ),
    showInNav: false,
  },

  // DYNAMIC ROUTE FOR ALL CATEGORIES AND SUBCATEGORIES
  {
    path: "/:categoryId/:subcategoryId?",
    element: (
      <MainLayout>
        <CategoryPage />
      </MainLayout>
    ),
    showInNav: false,
  },

  // Auth Routes
  {
    path: "/users/signup",
    element: <Signup />,
    showInNav: false,
    title: "Sign Up",
  },
  {
    path: "/users/login",
    element: <Login />,
    showInNav: false,
  },

  // Checkout Routes
  {
    path: "/checkout",
    element: (
      <MainLayout>
        <Checkout />
      </MainLayout>
    ),
    showInNav: false,
  },
  {
    path: "/order-confirmation/:orderId",
    element: (
      <MainLayout>
        <OrderConfirmation />
      </MainLayout>
    ),
    showInNav: false,
  },

  // ============================================
  // ADMIN ROUTES
  // ============================================
  // Public admin auth routes (no AdminLayout)
  {
    path: "/admin/login",
    element: <AdminLogin />,
    showInNav: false,
  },
  {
    path: "/admin/signup",
    element: <AdminSignup />,
    showInNav: false,
  },

  // Protected admin routes (with AdminLayout)
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    showInNav: false,
    children: [
      { index: true, element: <AdminDashboard /> }, // /admin
      { path: "dashboard", element: <AdminDashboard /> }, // /admin/dashboard
      { path: "products", element: <AdminProducts /> }, // /admin/products
      { path: "orders", element: <AdminOrders /> }, // /admin/orders
      // { path: "users", element: <AdminUsers /> },
      // { path: "categories", element: <AdminCategories /> },
    ],
  },
];

// ============================================
// 2. CATEGORIES DATA - For Navbar Dropdowns
// ============================================
export const categories = [
  {
    id: "cosmetics",
    name: "Cosmetics",
    href: "/cosmetics",
    items: [
      { name: "Face", href: "/cosmetics/face" },
      { name: "Eyes", href: "/cosmetics/eyes" },
      { name: "Lips", href: "/cosmetics/lips" },
      { name: "Nails", href: "/cosmetics/nails" },
      { name: "Brushes & Tools", href: "/cosmetics/tools" },
    ],
  },
  {
    id: "hair",
    name: "Hair",
    href: "/hair",
    items: [
      { name: "Shampoo & Conditioner", href: "/hair/shampoo" },
      { name: "Styling", href: "/hair/styling" },
      { name: "Color", href: "/hair/color" },
      { name: "Tools", href: "/hair/tools" },
      { name: "Treatments", href: "/hair/treatments" },
    ],
  },
  {
    id: "jewelry",
    name: "Jewelry",
    href: "/jewelry",
    items: [
      { name: "Necklaces", href: "/jewelry/necklaces" },
      { name: "Earrings", href: "/jewelry/earrings" },
      { name: "Bracelets", href: "/jewelry/bracelets" },
      { name: "Rings", href: "/jewelry/rings" },
      { name: "Watches", href: "/jewelry/watches" },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    href: "/clothing",
    items: [
      { name: "Dresses", href: "/clothing/dresses" },
      { name: "Tops", href: "/clothing/tops" },
      { name: "Bottoms", href: "/clothing/bottoms" },
      { name: "Outerwear", href: "/clothing/outerwear" },
      { name: "Lingerie", href: "/clothing/lingerie" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    href: "/accessories",
    items: [
      { name: "Bags", href: "/accessories/bags" },
      { name: "Belts", href: "/accessories/belts" },
      { name: "Hats", href: "/accessories/hats" },
      { name: "Scarves", href: "/accessories/scarves" },
      { name: "Sunglasses", href: "/accessories/sunglasses" },
    ],
  },
];

// ============================================
// 3. CATEGORIES ITEMS - For Featured Categories
// ============================================
export const categoriesItems = [
  {
    id: 1,
    name: "Cosmetics",
    href: "/cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Face, eyes, lips & more",
    itemCount: "240+ products",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 2,
    name: "Hair",
    href: "/hair",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Care, styling & color",
    itemCount: "180+ products",
    color: "from-red-600 to-rose-500",
  },
  {
    id: 3,
    name: "Jewelry",
    href: "/jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Necklaces, rings & more",
    itemCount: "150+ products",
    color: "from-amber-500 to-red-500",
  },
  {
    id: 4,
    name: "Clothing",
    href: "/clothing",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Dresses, tops & outerwear",
    itemCount: "320+ products",
    color: "from-red-500 to-orange-500",
  },
];

// ============================================
// 4. PRODUCTS DATA - For Best Sellers
// ============================================
export const products = [
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    brand: "GlamHive Cosmetics",
    price: 29,
    originalPrice: 39,
    rating: 4.8,
    reviews: 1243,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    colors: ["#e11d48", "#7c2d12", "#831843", "#2d1b0d"],
    category: "cosmetics",
    subcategory: "lips",
  },
  {
    id: 2,
    name: "24K Gold Hair Serum",
    brand: "Luxe Hair",
    price: 45,
    originalPrice: 65,
    rating: 4.9,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1626014303751-0a76b40e38a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Limited",
    colors: ["#eab308", "#f97316", "#a21caf"],
    category: "hair",
    subcategory: "treatments",
  },
  // ... rest of your products
];

// ============================================
// 5. BANNERS DATA - For Promotional Banner
// ============================================
export const banners = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Sun-kissed glow, all season long",
    description: "Discover lightweight formulas & vibrant colors",
    cta: "Shop Summer Edit",
    href: "/summer-collection",
    icon: Sparkles,
    gradient: "from-orange-400 via-red-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgPosition: "center 30%",
  },
  {
    id: 2,
    title: "Luxury Hair Essentials",
    subtitle: "Professional-grade care",
    description: "From bond repair to thermal protection",
    cta: "Explore Hair Care",
    href: "/hair/luxury",
    icon: Flower2,
    gradient: "from-amber-600 via-red-600 to-rose-500",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgPosition: "center 40%",
  },
  {
    id: 3,
    title: "Bridal Jewelry Edit",
    subtitle: "Say yes to forever elegance",
    description: "Handcrafted pieces for your special day",
    cta: "Shop Bridal Collection",
    href: "/jewelry/bridal",
    icon: Gem,
    gradient: "from-rose-400 via-red-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bgPosition: "center 20%",
  },
];