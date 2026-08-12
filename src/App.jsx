import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import JanaBai from "./pages/JanaBai";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [currentTab, setCurrentTab] = useState("janabai");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все товары");
  
  // Drawer & Modals state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // User & Data state mock/fallbacks
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const triggerToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    triggerToast("Вы вышли из системы");
  };

  const handleTabChange = (tab) => {
    if (tab === "janabai") {
      setCurrentTab("janabai");
    } else {
      // Redirect to main taobeybuyers.kz platform for shop/promo/delivery etc.
      window.location.href = "https://taobeybuyers.kz";
    }
  };

  return (
    <div className="app-container">
      {/* Toast Mounting */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Main Header Component */}
      <Header
        products={[]}
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsAuthModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        setIsCartOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        setIsOrdersModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        cart={cart}
        favorites={favorites}
        user={user}
        orders={orders}
        handleLogout={handleLogout}
        triggerToast={triggerToast}
        theme={theme}
        setTheme={setTheme}
        isAdminUnlocked={false}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        user={user}
        handleLogout={handleLogout}
        setIsAuthModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        triggerToast={triggerToast}
        isAdminUnlocked={false}
        setIsOrdersModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
      />

      {/* Jana Bai Landing Page */}
      <main style={{ flexGrow: 1 }}>
        <JanaBai
          triggerToast={triggerToast}
          setIsAuthModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
          theme={theme}
        />
      </main>

      {/* Main Footer Component */}
      <Footer
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favorites={favorites}
        cart={cart}
        orders={orders}
        user={user}
        setIsCartOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        setIsOrdersModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        setIsAuthModalOpen={() => (window.location.href = "https://taobeybuyers.kz")}
        triggerToast={triggerToast}
        theme={theme}
        setTheme={setTheme}
        isAdminUnlocked={false}
        settings={{}}
      />
    </div>
  );
}
