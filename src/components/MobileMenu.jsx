import React from "react";
import { Logo } from "./Logo";
import { X, Home, Truck, ShieldCheck, HelpCircle, MessageSquare, ArrowUpRight, Flame, Store } from "lucide-react";

export default function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  currentTab,
  setCurrentTab,
  user,
  handleLogout,
  setIsAuthModalOpen,
  triggerToast,
  isAdminUnlocked,
  setIsOrdersModalOpen,
}) {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}>
      <div
        className="drawer"
        style={{ left: 0, right: "auto", animationName: "slideRight" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Logo className="logo-image" style={{ height: "30px" }} />
          </h3>
          <button
            className="dialog-close"
            style={{ position: "static" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div
          className="drawer-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "20px 16px",
          }}
        >
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "shop" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("shop");
            }}
          >
            <Home size={20} color={currentTab === "shop" ? "var(--primary-color)" : "currentColor"} />
            Главная
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "promo" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("promo");
            }}
            style={{ color: currentTab === "promo" ? "var(--primary-color)" : undefined, fontWeight: 700 }}
          >
            <Flame size={20} color={currentTab === "promo" ? "var(--primary-color)" : "currentColor"} fill={currentTab === "promo" ? "var(--primary-color)" : "none"} />
            Закуп из Китая (Реклама)
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "sell" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("sell");
            }}
            style={{ color: currentTab === "sell" ? "var(--primary-color)" : undefined, fontWeight: 700 }}
          >
            <Store size={20} color={currentTab === "sell" ? "var(--primary-color)" : "currentColor"} />
            Как продавать на маркетплейсах
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "delivery" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("delivery");
            }}
          >
            <Truck size={20} color={currentTab === "delivery" ? "var(--primary-color)" : "currentColor"} />
            Доставка и оплата
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "warranty" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("warranty");
            }}
          >
            <ShieldCheck size={20} color={currentTab === "warranty" ? "var(--primary-color)" : "currentColor"} />
            Гарантия и возврат
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "faq" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("faq");
            }}
          >
            <HelpCircle size={20} color={currentTab === "faq" ? "var(--primary-color)" : "currentColor"} />
            Вопрос и ответ
          </a>
          <a
            href="#"
            className={`menu-item-link-mobile ${currentTab === "support" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setCurrentTab("support");
            }}
          >
            <MessageSquare size={20} color={currentTab === "support" ? "var(--primary-color)" : "currentColor"} />
            Поддержка
          </a>
          <a
            href="https://taobey.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-item-link-mobile"
            style={{ color: "var(--primary-color)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ArrowUpRight size={20} color="#ff5000" />
            Перейти на Taobey.kz
          </a>

          <div
            style={{
              marginTop: "auto",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "20px",
            }}
          >
            {user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Вы вошли как: <strong>{user.phone}</strong>
                </div>
                {user.role === "admin" && isAdminUnlocked ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentTab(currentTab === "shop" ? "admin" : "shop");
                    }}
                  >
                    Панель администратора
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                  >
                    Личный кабинет
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  style={{
                    color: "red",
                    borderColor: "rgba(255, 0, 0, 0.2)",
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Выйти из профиля
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                Войти в профиль
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
