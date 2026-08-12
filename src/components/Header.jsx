import React, { useState } from "react";
import {
  Menu,
  LayoutGrid,
  Search,
  Heart,
  ShoppingBasket,
  Package,
  User,
  LogOut,
  Sun,
  Moon,
  X,
  ArrowUpRight,
  Flame,
  Store,
} from "lucide-react";

export default function Header({
  products = [],
  currentTab,
  setCurrentTab,
  showFavoritesOnly,
  setShowFavoritesOnly,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  setIsMobileMenuOpen,
  setIsAuthModalOpen,
  setIsCartOpen,
  setIsOrdersModalOpen,
  cart,
  favorites,
  user,
  orders,
  handleLogout,
  triggerToast,
  theme,
  setTheme,
  isAdminUnlocked,
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <header className="header-container">
      <div className="header-top">
        {/* Mobile Menu & Logo Group */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Меню"
          >
            <Menu size={24} />
          </button>
          <a
            href="#"
            className="logo-link"
            onClick={() => {
              setCurrentTab("shop");
              setShowFavoritesOnly(false);
            }}
          >
            <img
              src="/logo.svg"
              alt="TaoBey Buyers Logo"
              className="logo-image"
            />
          </a>
        </div>

        {/* Catalog Button */}
        <button
          className="catalog-btn"
          onClick={() => {
            const isAlreadyOnShop = currentTab === "shop";
            setCurrentTab("shop");
            setSelectedCategory("Все товары");
            setShowFavoritesOnly(false);

            setTimeout(
              () => {
                const el = document.getElementById("shop-catalog-section");
                if (el) {
                  const yOffset = -130; // Leave 130px gap to account for sticky header and spacing
                  const y =
                    el.getBoundingClientRect().top +
                    (window.scrollY || window.pageYOffset) +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              },
              isAlreadyOnShop ? 50 : 250,
            );
          }}
        >
          <LayoutGrid size={18} />
          <span>Каталог</span>
        </button>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по товарам"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              onMouseDown={(e) => {
                // Prevent input blur before clearing is done
                e.preventDefault();
              }}
              title="Очистить поиск"
            >
              <X size={16} />
            </button>
          )}
          <button className="search-icon-btn">
            <Search size={18} />
          </button>

          {/* Autocomplete Suggestions Dropdown */}
          {isFocused && searchQuery.trim() !== "" && (
            <div className="search-suggestions-dropdown">
              <div className="suggestion-header">Подходящие товары</div>
              {products
                .filter(
                  (p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product.id}
                    className="suggestion-item"
                    onMouseDown={() => {
                      setSearchQuery(product.title);
                      setCurrentTab("shop");
                      setShowFavoritesOnly(false);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="suggestion-img"
                    />
                    <div className="suggestion-info">
                      <span className="suggestion-title">{product.title}</span>
                      <span className="suggestion-category">
                        {product.category}
                      </span>
                    </div>
                  </div>
                ))}
              {products.filter(
                (p) =>
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.category.toLowerCase().includes(searchQuery.toLowerCase()),
              ).length === 0 && (
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    textAlign: "center",
                  }}
                >
                  Ничего не найдено
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme toggle */}
          <button
            className="nav-icon-link"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Сменить тему"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            <span>Тема</span>
          </button>

          {/* Favorites Icon */}
          <button
            className="nav-icon-link"
            onClick={() => {
              setCurrentTab("shop");
              setShowFavoritesOnly((prev) => !prev);
            }}
          >
            <Heart
              size={22}
              color={showFavoritesOnly ? "#ff3366" : "currentColor"}
              fill={showFavoritesOnly ? "#ff3366" : "none"}
            />
            <span>Избранное</span>
            {favorites.length > 0 && (
              <span
                className="nav-icon-badge"
                style={{ background: "#ff3366" }}
              >
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            className="nav-icon-link"
            onClick={() => {
              if (user) {
                setIsCartOpen(true);
              } else {
                setIsAuthModalOpen(true);
                triggerToast(
                  "Пожалуйста, авторизуйтесь для просмотра корзины",
                  "info",
                );
              }
            }}
          >
            <ShoppingBasket size={22} />
            <span>Корзина</span>
            {cart.length > 0 && (
              <span
                className="nav-icon-badge"
                style={{ background: "var(--primary-color)" }}
              >
                {cart.length}
              </span>
            )}
          </button>

          {/* Profile / Admin Login */}
          {user ? (
            <div
              style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}
            >
              {user.role === "admin" && isAdminUnlocked ? (
                <>
                  <button
                    className="nav-icon-link"
                    onClick={() =>
                      setCurrentTab(currentTab === "shop" ? "admin" : "shop")
                    }
                  >
                    <User size={22} color="var(--primary-color)" />
                    <span>Админ</span>
                  </button>
                  <button
                    className="nav-icon-link"
                    onClick={handleLogout}
                    style={{ color: "red" }}
                  >
                    <LogOut size={16} />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <button
                  className="nav-icon-link"
                  onClick={() => setIsOrdersModalOpen(true)}
                  style={{ position: "relative" }}
                >
                  <User size={22} />
                  <span>Кабинет</span>
                  {orders.length > 0 && (
                    <span
                      className="nav-icon-badge"
                      style={{ background: "#10b981" }}
                    >
                      {orders.length}
                    </span>
                  )}
                </button>
              )}
            </div>
          ) : (
            <button
              className="nav-icon-link"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User size={22} />
              <span>Войти</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Header Menu Bar */}
      <div className="header-menu-bar">
        <div className="header-menu-content">
          <a
            href="#"
            className={`menu-item-link ${currentTab === "shop" && !showFavoritesOnly ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("shop");
              setShowFavoritesOnly(false);
            }}
          >
            Buyers
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "promo" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("promo");
            }}
            style={{
              fontWeight: 700,
              color:
                currentTab === "promo" ? "var(--primary-color)" : undefined,
            }}
          >
            Закуп из Китая
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "sell" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("sell");
            }}
            style={{
              fontWeight: 700,
              color: currentTab === "sell" ? "var(--primary-color)" : undefined,
            }}
          >
            Как продавать?
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "delivery" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("delivery");
            }}
          >
            Доставка и оплата
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "warranty" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("warranty");
            }}
          >
            Гарантия и возврат
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "faq" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("faq");
            }}
          >
            Вопрос и ответ
          </a>
          <a
            href="#"
            className={`menu-item-link ${currentTab === "support" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("support");
            }}
          >
            Поддержка
          </a>
          <a
            href="https://taobey.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-item-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--primary-color)",
            }}
          >
            Taobey.kz
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
