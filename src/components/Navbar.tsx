import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import LogoImg from "../assets/Logo.webp";
import { useLang } from "../i18n/LanguageContext";
import type { Lang } from "../i18n/translations";
import { useProjects } from "../data/projects";
import { site } from "../config/site";

interface SubItem {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to: string;
  children?: SubItem[];
}

/* ── Language toggle ─────────────────────────────────────────── */
const LangToggle = ({
  lang,
  setLang,
  className = "",
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
}) => (
  <div className={`langsw ${className}`.trim()} role="group" aria-label="Language">
    <span
      className="langsw__thumb"
      aria-hidden="true"
      style={{ transform: `translateX(${lang === "en" ? "100%" : "0%"})` }}
    />
    {(["id", "en"] as Lang[]).map((code) => (
      <button
        key={code}
        type="button"
        className={`langsw__btn${lang === code ? " langsw__btn--active" : ""}`}
        aria-pressed={lang === code}
        onClick={() => setLang(code)}
      >
        {code.toUpperCase()}
      </button>
    ))}
  </div>
);

const Chevron = () => (
  <svg className="navlink__chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Desktop link, with optional dropdown ────────────────────── */
interface DesktopLinkProps {
  item: NavItem;
  onNavClick: (to: string) => (e: React.MouseEvent) => void;
}

const DesktopLink = ({ item, onNavClick }: DesktopLinkProps) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close on Escape — a pointer-only menu traps keyboard users.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // A short close delay keeps the menu open while the pointer crosses
  // the gap between the trigger and the panel.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  if (!item.children?.length) {
    return (
      <NavLink
        to={item.to}
        end={item.to === "/"}
        className={({ isActive }) => `navlink${isActive ? " navlink--active" : ""}`}
        onClick={onNavClick(item.to)}
      >
        <span className="navlink__label">{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="navdrop"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `navlink navlink--hasmenu${isActive ? " navlink--active" : ""}`
        }
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onNavClick(item.to)}
      >
        <span className="navlink__label">{item.label}</span>
        <Chevron />
      </NavLink>

      <div
        className={`navmenu${open ? " navmenu--open" : ""}`}
        role="menu"
        aria-hidden={!open}
        onMouseEnter={cancelClose}
      >
        <div className="navmenu__inner">
          {item.children.map((sub, i) => (
            <Link
              key={sub.to}
              to={sub.to}
              className="navmenu__item"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              style={{ "--i": i } as React.CSSProperties}
              onClick={(e) => {
                setOpen(false);
                onNavClick(sub.to)(e);
              }}
            >
              <span className="navmenu__no">{String(i + 1).padStart(2, "0")}</span>
              <span className="navmenu__label">{sub.label}</span>
              <svg className="navmenu__arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Navbar ──────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { lang, setLang, t } = useLang();
  const { projects } = useProjects();
  const { pathname } = useLocation();

  const items: NavItem[] = [
    { label: t.nav.home, to: "/" },
    {
      label: t.nav.project,
      to: "/projects",
      children: (projects ?? []).map((p) => ({
        label: p.name[lang],
        to: `/projects/${p.id}`,
      })),
    },
    {
      label: t.nav.about,
      to: "/about",
      children: [
        { label: t.nav.profile, to: "/about#about-hero" },
        { label: t.nav.vision, to: "/about#vision-mission" },
        { label: t.nav.visit, to: "/about#our-location" },
      ],
    },
    { label: t.nav.contact, to: "/contact" },
  ];

  // Scroll state: solid background and reading progress. The bar stays
  // put — hiding it on scroll left a gap above the project pages'
  // sticky section nav, which docks directly beneath it.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change closes the drawer. Adjusting during render (rather
  // than in an effect) avoids a frame where the new page is behind an
  // open menu.
  const [drawerPath, setDrawerPath] = useState(pathname);
  if (drawerPath !== pathname) {
    setDrawerPath(pathname);
    setMobileOpen(false);
  }

  // Lock the page while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /**
   * Handles clicks on a link that points at the page you are already
   * on. React Router treats those as no-ops, so "About Us" did nothing
   * while on /about. Here they scroll instead: to the anchored section
   * if the link carries one, otherwise back to the top. Links to a
   * different page — and to a different anchor on this page — are left
   * to the router.
   */
  const handleNavClick = (to: string) => (e: React.MouseEvent) => {
    const [path = "", hash = ""] = to.split("#");
    if (path.toLowerCase() !== pathname.toLowerCase()) return;

    const hashChanges = hash && `#${hash}` !== window.location.hash;
    if (hashChanges) return; // the router pushes it; the page scrolls itself

    e.preventDefault();
    setMobileOpen(false);

    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // The home hero is a dark image, so the bar can float transparently
  // there. Every other page opens on a light section and needs the
  // solid treatment from the very top.
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <>
      <header
        className={[
          "nav",
          solid ? "nav--solid" : "",
          mobileOpen ? "nav--open" : "",
        ].filter(Boolean).join(" ")}
      >
        <a className="nav__skip" href="#main">Skip to content</a>

        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label={`${site.name} — home`}>
            <img src={LogoImg} alt="" className="nav__mark" width={42} height={42} />
            <span className="nav__word">
              <span className="nav__name">Green Karindo Elite</span>
              <span className="nav__tag">{t.logo.tagline}</span>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {items.map((item) => (
              <DesktopLink key={item.to} item={item} onNavClick={handleNavClick} />
            ))}
          </nav>

          <div className="nav__actions">
            <LangToggle lang={lang} setLang={setLang} />
            <Link to="/contact" className="btn btn--sm nav__cta">
              {t.nav.cta}
            </Link>
          </div>

          <button
            type="button"
            className={`nav__burger${mobileOpen ? " nav__burger--open" : ""}`}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="nav-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>

        {/* Reading progress — a hairline of gold along the bar's edge. */}
        <span
          className="nav__progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* ── Mobile drawer ──
          Kept outside <header> on purpose: the bar's backdrop-filter
          makes it the containing block for fixed descendants, which
          would collapse this panel to the height of the bar. */}
      <div
        id="nav-drawer"
        className={`drawer${mobileOpen ? " drawer--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="drawer__scroll">
          <nav className="drawer__nav" aria-label="Mobile navigation">
            {items.map((item, i) => (
              <div
                className="drawer__group"
                key={item.to}
                style={{ "--i": i } as React.CSSProperties}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `drawer__link${isActive ? " drawer__link--active" : ""}`
                  }
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={handleNavClick(item.to)}
                >
                  <span className="drawer__no">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </NavLink>

                {item.children?.length ? (
                  <div className="drawer__subs">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="drawer__sub"
                        tabIndex={mobileOpen ? 0 : -1}
                        onClick={handleNavClick(sub.to)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="drawer__foot">
            <div className="rule" />
            <div className="drawer__foot-row">
              <LangToggle lang={lang} setLang={setLang} className="langsw--ink" />
              <a
                className="drawer__wa"
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.whatsappDisplay}
              </a>
            </div>
            <p className="drawer__addr">{site.address}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
