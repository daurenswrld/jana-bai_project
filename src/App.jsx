import React, { useState, useEffect } from "react";
import {
  Flame,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  ShoppingBag,
  DollarSign,
  ChevronRight,
  Newspaper,
  Globe,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import { apiFetch } from "./utils/api";

// Phone number mask formatter (+7 (7XX) XXX-XX-XX)
const formatPhoneNumber = (input, prevVal = "") => {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.startsWith("8")) {
    digits = "7" + digits.substring(1);
  } else if (digits.length > 0 && !digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.substring(0, 11);
  let formatted = "+7";
  if (digits.length > 1) {
    formatted += " (" + digits.substring(1, 4);
  }
  if (digits.length > 4) {
    formatted += ") " + digits.substring(4, 7);
  }
  if (digits.length > 7) {
    formatted += "-" + digits.substring(7, 9);
  }
  if (digits.length > 9) {
    formatted += "-" + digits.substring(9, 11);
  }
  if (
    prevVal.length - input.length === 1 &&
    formatted.length === prevVal.length
  ) {
    digits = digits.substring(0, digits.length - 1);
    formatted = "+7";
    if (digits.length > 1) {
      formatted += " (" + digits.substring(1, 4);
    }
    if (digits.length > 4) {
      formatted += ") " + digits.substring(4, 7);
    }
    if (digits.length > 7) {
      formatted += "-" + digits.substring(7, 9);
    }
    if (digits.length > 9) {
      formatted += "-" + digits.substring(9, 11);
    }
  }
  return formatted;
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(true);
  const [toast, setToast] = useState(null);

  // Application Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    experience: "Без опыта",
    goal: "Выйти на доход от 1 000 000 ₸/мес",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load news posts & participants from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, partsData] = await Promise.all([
          apiFetch("/janabai/posts"),
          apiFetch("/janabai/participants"),
        ]);
        if (Array.isArray(postsData)) setPosts(postsData);
        if (Array.isArray(partsData)) setParticipants(partsData);
      } catch (err) {
        console.warn("Failed to load Jana Bai data:", err);
      } finally {
        setLoadingPosts(false);
        setLoadingParticipants(false);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      showToast("Укажите ваш номер телефона", "info");
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiFetch("/janabai/applications", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          source: typeof window !== "undefined" ? window.location.hostname : "janabai.kz"
        }),
      });
      if (res && res.success) {
        setSubmittedSuccess(true);
        showToast("Ваша заявка в проект Jana Bai принята!", "success");
        setFormData({
          name: "",
          phone: "",
          city: "",
          experience: "Без опыта",
          goal: "Выйти на доход от 1 000 000 ₸/мес",
        });
      } else {
        showToast(
          "Не удалось отправить заявку: " + (res?.message || "Ошибка"),
          "error"
        );
      }
    } catch (err) {
      showToast("Ошибка отправки заявки: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="janabai-page-container">
      {/* --- STICKY HEADER --- */}
      <header className="janabai-header">
        <div className="janabai-container header-content">
          <a href="#" className="brand-logo">
            <div className="logo-icon">
              <Flame size={22} />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-title">JANA BAI</span>
              <span className="logo-subtitle">by Taobey Buyers</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#about" className="nav-link">О проекте</a>
            <a href="#advantages" className="nav-link">Преимущества</a>
            <a href="#cases" className="nav-link">Участники</a>
            <a href="#janabai-news" className="nav-link">Дневник</a>
          </nav>

          <a href="#janabai-form" className="btn-header-cta">
            <span>ПОДАТЬ ЗАЯВКУ</span>
          </a>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="janabai-hero" id="about">
        <div className="janabai-hero-overlay" />
        <div className="janabai-container hero-content">
          <div className="janabai-badge">
            <Flame size={16} className="pulse-icon" />
            <span>РЕАЛИТИ-ПРОЕКТ JANA BAI</span>
          </div>

          <h1 className="janabai-title">
            Твой путеводитель от <span className="highlight-gold">0 ₸</span> до{" "}
            <span className="highlight-green">миллионных оборотов</span> на маркетплейсах
          </h1>

          <p className="janabai-subtitle">
            Мы выбираем участников, выдаём им товар из Китая и ставим задачу:
            <br />
            <b>продать его на маркетплейсах и заработать больше остальных.</b>
            <br />
            <br />
            <span className="highlight-gold" style={{ fontWeight: 700 }}>
              Kaspi • Wildberries • Ozon
            </span>
            <span style={{ opacity: 0.8, marginLeft: "8px", fontSize: "0.9em" }}>
              (Amazon & eBay — в разработке для проверенных партнёров)
            </span>
            <br />
            Становитесь партнёром Taobey Buyers — и наши менеджеры сделают всю логистику и закуп за вас.
          </p>

          <div className="janabai-hero-actions">
            <a href="#janabai-form" className="btn-primary-gold">
              <span>ПОДАТЬ ЗАЯВКУ НА УЧАСТИЕ</span>
              <ArrowRight size={18} />
            </a>
            <a href="#janabai-news" className="btn-secondary-glass">
              <Newspaper size={18} />
              <span>Смотреть дневник проекта</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- ADVANTAGES SECTION --- */}
      <section className="janabai-features" id="advantages">
        <div className="janabai-container">
          <div className="section-header-center">
            <span className="sub-tag">КАК ЭТО РАБОТАЕТ</span>
            <h2>
              Почему проект <span className="gold-text">Jana Bai</span> дает результат
            </h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon gold">
                <PackageCheck size={28} />
              </div>
              <h3>Прямой выкуп из Китая</h3>
              <p>
                Покупайте на Taobey Buyers по ценам фабрик без посредников.
                Маржа товаров до 200–300%.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <ShoppingBag size={28} />
              </div>
              <h3>Выход на Kaspi, WB, Ozon, Amazon & eBay</h3>
              <p>
                Готовые карточки, проверенные ниши, настройка складов. В будущем — прямой выход на Amazon и eBay для топовых селлеров.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <TrendingUp size={28} />
              </div>
              <h3>Партнёрство под ключ</h3>
              <p>
                Становитесь партнёром Taobey Buyers — наши менеджеры возьмут на себя поиск, выкуп, логистику и сопровождение продаж.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FIRST 5 CASES SHOWCASE --- */}
      <section className="janabai-cases" id="cases">
        <div className="janabai-container">
          <div className="section-header-center">
            <span className="sub-tag">ПЕРВЫЙ ЭТАП РЕАЛИТИ</span>
            <h2>Первые 5 Участников Трансформации</h2>
            <p className="section-desc">
              Прямо сейчас мы публично ведем 5 человек от выбора ниши до 5+ млн
              тенге чистого дохода!
            </p>
          </div>

          {loadingParticipants ? (
            <div className="janabai-loading">
              <div className="spinner" />
              <p>Загрузка карточек участников...</p>
            </div>
          ) : participants.length === 0 ? (
            <div className="janabai-empty-state-card">
              <h3>Первая 5-ка находится на этапе отбора</h3>
              <p>
                Прямо сейчас мы рассматриваем поступающие заявки и отбираем 5
                кандидатов, которых публично ведем до 5+ млн тенге. Заполните
                форму ниже, чтобы занять место!
              </p>
              <a href="#janabai-form" className="btn-empty-action">
                <span>Подать заявку в 1-й выпуск</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="cases-grid">
              {participants.map((c) => (
                <div key={c.id} className="case-card">
                  <div className="case-image-wrapper">
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="case-img" />
                    ) : (
                      <div
                        className="case-img-placeholder"
                        style={{
                          width: "100%",
                          height: "180px",
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Sparkles size={32} color="#eab308" />
                      </div>
                    )}
                    {c.city && (
                      <span className="case-city-badge">{c.city}</span>
                    )}
                  </div>
                  <div className="case-body">
                    <h4>{c.name}</h4>
                    <div className="case-meta">
                      <span className="case-label">Ниша:</span>
                      <span className="case-value">{c.category}</span>
                    </div>
                    {c.goal && (
                      <div className="case-meta">
                        <span className="case-label">Цель по доходу:</span>
                        <span className="case-value gold">{c.goal}</span>
                      </div>
                    )}
                    {c.status && (
                      <div className="case-status-badge">
                        <Zap size={14} />
                        <span>{c.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- APPLICATION FORM SECTION --- */}
      <section className="janabai-form-section" id="janabai-form">
        <div className="janabai-container">
          <div className="form-card-wrapper">
            <div className="form-info-side">
              <span className="sub-tag">НАБОР УЧАСТНИКОВ</span>
              <h2>
                Займи место в потоке <span className="gold-text">Jana Bai</span>
              </h2>
              <p>
                Оставь заявку прямо сейчас. Наш менеджер свяжется с тобой для короткого
                собеседования и разработки стратегии.
              </p>

              <ul className="check-list">
                <li>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span>Доступ к фабричным ценам Китая (Taobey Buyers)</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span>Готовый алгоритм выхода на 1 млн+ ₸ в месяц</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span>Персональный менеджер и логистика под ключ</span>
                </li>
              </ul>
            </div>

            <div className="form-inputs-side">
              {submittedSuccess ? (
                <div className="success-state">
                  <div className="success-icon">
                    <CheckCircle2 size={48} color="#22c55e" />
                  </div>
                  <h3>Заявка успешно отправлена!</h3>
                  <p>
                    Наш менеджер свяжется с вами в течение 15 минут для
                    подтверждения брони места.
                  </p>
                  <button
                    className="btn-primary-gold"
                    onClick={() => setSubmittedSuccess(false)}
                    style={{ marginTop: "15px" }}
                  >
                    Подать еще одну заявку
                  </button>
                </div>
              ) : (
                <form className="janabai-form" onSubmit={handleFormSubmit}>
                  <h3>Заполните анкету</h3>

                  <div className="input-group">
                    <label>Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Номер телефона (WhatsApp) *</label>
                    <input
                      type="tel"
                      placeholder="+7 (777) 000-00-00"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: formatPhoneNumber(
                            e.target.value,
                            formData.phone
                          ),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Город проживания</label>
                    <input
                      type="text"
                      placeholder="Алматы, Астана, Шымкент и др."
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Опыт в торговле / на маркетплейсах</label>
                    <select
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                    >
                      <option value="Без опыта">
                        Абсолютно без опыта (Новичок)
                      </option>
                      <option value="Начинающий">
                        Пробовал продавать, но мало опыта
                      </option>
                      <option value="Действующий селлер">
                        Действующий селлер (хочу больше маржи)
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit-gold"
                    disabled={submitting}
                  >
                    {submitting ? "Отправка..." : "ЗАБРОНИРОВАТЬ МЕСТО"}
                    <Send size={18} />
                  </button>

                  <p className="privacy-note">
                    Ваши данные защищены. Нажимая кнопку, вы соглашаетесь с
                    правилами проекта.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE NEWS & PROGRESS FEED --- */}
      <section className="janabai-news-section" id="janabai-news">
        <div className="janabai-container">
          <div className="section-header-center">
            <span className="sub-tag">ДНЕВНИК ПРОЕКТА</span>
            <h2>Новости и Результаты Участников</h2>
            <p className="section-desc">
              Следите за реальным процессом: поставки из Китая, листинг на
              маркетплейсах и чистая выручка.
            </p>
          </div>

          {loadingPosts ? (
            <div className="janabai-loading">
              <div className="spinner" />
              <p>Загрузка новостей проекта...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="janabai-empty-state-card">
              <h3>Первый выпуск готовится к публикации</h3>
              <p>
                Мы опубликуем первые отчеты сразу после старта работы когорты:
                логистика из Китая, листинг товаров и цифры продаж участников на
                маркетплейсах.
              </p>
            </div>
          ) : (
            <div className="news-grid">
              {posts.map((post) => (
                <article key={post.id} className="news-card">
                  {post.image && (
                    <div className="news-image-wrap">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="news-img"
                      />
                      {post.badge && (
                        <span className="news-badge">{post.badge}</span>
                      )}
                    </div>
                  )}
                  <div className="news-body">
                    <div className="news-meta">
                      <span className="news-tag">{post.tag || "Новости"}</span>
                      <span className="news-date">
                        <Calendar size={13} />
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString(
                              "ru-RU",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "Сегодня"}
                      </span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="news-text">{post.content}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="janabai-footer">
        <div className="janabai-container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="brand-logo">
                <div className="logo-icon">
                  <Flame size={20} />
                </div>
                <div className="logo-text-wrap">
                  <span className="logo-title">JANA BAI</span>
                  <span className="logo-subtitle">by Taobey Buyers</span>
                </div>
              </a>
              <p>
                Реалити-проект и бизнес-акселератор селлеров в Казахстане. Выход на миллионные обороты на маркетплейсах под ключ.
              </p>
            </div>

            <div className="footer-links">
              <a href="https://taobeybuyers.kz" target="_blank" rel="noreferrer" style={{ color: "#eab308", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                <span>Платформа Taobey Buyers</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Jana Bai (janabai.kz). Все права защищены.</span>
            <span>Партнерская сеть Taobey Buyers</span>
          </div>
        </div>
      </footer>

      {/* TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
