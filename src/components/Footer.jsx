import React from "react";
import { Logo } from "./Logo";
import { LayoutGrid, Heart, ShoppingBasket, Package, User, Sun, Moon, Instagram } from "lucide-react";

export default function Footer({
  currentTab,
  setCurrentTab,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favorites,
  cart,
  orders,
  user,
  setIsCartOpen,
  setIsOrdersModalOpen,
  setIsAuthModalOpen,
  triggerToast,
  theme,
  setTheme,
  isAdminUnlocked,
  settings,
}) {
  return (
    <>
      {/* Desktop Footer (Bold Chinese Marketplace Style) */}
      <footer className="desktop-footer">
        <div className="footer-advantages-row">
          <div className="advantage-card">
            <div className="advantage-icon-box">厂价</div>
            <div className="advantage-text-box">
              <h4>ЦЕНЫ ЗАВОДОВ</h4>
              <p>足不出户 Напрямую с фабрик Китая без посредников</p>
            </div>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon-box">安全</div>
            <div className="advantage-text-box">
              <h4>БЕЗОПАСНОСТЬ</h4>
              <p>资金安全 Контроль качества и страхование грузов</p>
            </div>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon-box">物流</div>
            <div className="advantage-text-box">
              <h4>БЫСТРАЯ ЛОГИСТИКА</h4>
              <p>Доставка в Алматы и по всем регионам Казахстана</p>
            </div>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon-box">服务</div>
            <div className="advantage-text-box">
              <h4>ПОДДЕРЖКА</h4>
              <p>Прямая связь с вашим личным закупщиком</p>
            </div>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-brand-info">
            <Logo className="logo-image" style={{ height: "32px", marginBottom: "12px", display: "block" }} />
            <p className="footer-brand-desc">
              {settings?.footerAboutText || "Реалити-проект Jana Bai — публичный трекинг предпринимателей на маркетплейсах. Оптовые закупки напрямую с крупнейших фабрик Китая."}
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Покупателям</h4>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              const isAlreadyOnShop = currentTab === "shop";
              setCurrentTab("shop");
              setShowFavoritesOnly(false);
              setTimeout(() => {
                const el = document.getElementById("shop-catalog-section");
                if (el) {
                  const yOffset = -130;
                  const y =
                    el.getBoundingClientRect().top +
                    (window.scrollY || window.pageYOffset) +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }, isAlreadyOnShop ? 50 : 250);
            }}>Каталог товаров</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab("sell"); }}>Как продавать на маркетплейсах</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab("delivery"); }}>Доставка и оплата</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab("warranty"); }}>Гарантия и возврат</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab("faq"); }}>Вопросы и ответы</a>
          </div>

          <div className="footer-links-col">
            <h4>Контакты</h4>
            <a href="tel:+77009967382" className="footer-contact-link">+7 (700) 996 73 82</a>
            <a href="mailto:info@taobey.kz" className="footer-contact-link">info@taobey.kz</a>
            <span className="footer-contact-text">Казахстан, г. Алматы</span>
          </div>

          <div className="footer-links-col">
            <h4>Мы в соцсетях</h4>
            <div className="footer-social-row">
              <a href={settings?.socialWhatsapp || "https://wa.me/77772010101?text=%D0%97%D0%B4%D1%80%D0%B5%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%82%D0%BE%D0%B2%D0%B0%D1%80..."} target="_blank" rel="noreferrer" className="footer-social-icon wa" title="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
              </a>
              <a href={settings?.socialTelegram || "https://t.me/+77772010101"} target="_blank" rel="noreferrer" className="footer-social-icon tg" title="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
              <a href={settings?.socialInstagram || "https://www.instagram.com/taobey.asia?utm_source=qr&igsh=MWZ3MGtlbXBlampwNA=="} target="_blank" rel="noreferrer" className="footer-social-icon inst" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href={settings?.socialTiktok || "https://www.tiktok.com/@taobey.kz?_r=1&_t=ZS-95lwhUq4kDM"} target="_blank" rel="noreferrer" className="footer-social-icon tk" title="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 淘备买手 (TAOBEY BUYERS). Все права защищены. 足不出户就能拿到工厂价格的平台
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Tab Navigation for Mobile */}
      <nav className="mobile-bottom-nav">
        <button
          className={`bottom-nav-item ${currentTab === "shop" && !showFavoritesOnly ? "active" : ""}`}
          onClick={() => {
            const isAlreadyOnShop = currentTab === "shop";
            setCurrentTab("shop");
            setShowFavoritesOnly(false);
            setTimeout(() => {
              const el = document.getElementById("shop-catalog-section");
              if (el) {
                const yOffset = -130;
                const y =
                  el.getBoundingClientRect().top +
                  (window.scrollY || window.pageYOffset) +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }, isAlreadyOnShop ? 50 : 250);
          }}
        >
          <LayoutGrid size={20} />
          <span>Каталог</span>
        </button>
        <button
          className={`bottom-nav-item ${showFavoritesOnly ? "active" : ""}`}
          onClick={() => {
            setCurrentTab("shop");
            setShowFavoritesOnly(true);
          }}
        >
          <Heart size={20} />
          <span>Избранное</span>
          {favorites.length > 0 && (
            <span className="bottom-badge">{favorites.length}</span>
          )}
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => {
            if (user) {
              setIsCartOpen(true);
            } else {
              setIsAuthModalOpen(true);
              triggerToast("Пожалуйста, авторизуйтесь для просмотра корзины", "info");
            }
          }}
        >
          <ShoppingBasket size={20} />
          <span>Корзина</span>
          {cart.length > 0 && (
            <span
              className="bottom-badge"
              style={{ background: "var(--primary-color)" }}
            >
              {cart.length}
            </span>
          )}
        </button>
        <button
          className={`bottom-nav-item ${currentTab === "admin" ? "active" : ""}`}
          onClick={() => {
            if (user) {
              if (user.role === "admin" && isAdminUnlocked) {
                setCurrentTab(currentTab === "shop" ? "admin" : "shop");
              } else {
                setIsOrdersModalOpen(true);
              }
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          style={{ position: "relative" }}
        >
          <User size={20} />
          <span>{user && user.role === "admin" && isAdminUnlocked ? "Админ" : "Кабинет"}</span>
          {user && user.role !== "admin" && orders.length > 0 && (
            <span className="bottom-badge" style={{ background: "#10b981" }}>
              {orders.length}
            </span>
          )}
        </button>
      </nav>

      {/* Theme Floating Toggle */}
      <button
        className="theme-floating-btn"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        title="Сменить тему"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
}
