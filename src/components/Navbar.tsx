import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import LogoImg from "../assets/Logo.png";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ─────────────────────────────────────────────
// Navigation config — edit this to update links
// ─────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Project",
    dropdown: [
      { label: "Residential",  href: "/project/residential" },
      { label: "Commercial",   href: "/project/commercial" },
      { label: "Mixed Use",    href: "/project/mixed-use" },
    ],
  },
  {
    label: "Tentang Kami",
    href: "/About",
    dropdown: [
      { label: "Profil Perusahaan",          href: "/About#about-hero" },
      { label: "Visi & Misi",  href: "/About#vision-mission" },
      { label: "Kunjungi Kami",          href: "/About#our-location" },
    ],
  },
  { label: "Kontak", href: "/contact" },
];

// ─────────────────────────────────────────────
// Chevron icon
// ─────────────────────────────────────────────
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`chevron${open ? " chevron--open" : ""}`}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─────────────────────────────────────────────
// Hamburger icon
// ─────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {open ? (
      <>
        <line x1="3"  y1="3"  x2="19" y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="19" y1="3"  x2="3"  y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ) : (
      <>
        <line x1="2" y1="5.5"  x2="20" y2="5.5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="2" y1="11"   x2="20" y2="11"   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="2" y1="16.5" x2="20" y2="16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    )}
  </svg>
);

// ─────────────────────────────────────────────
// Dropdown menu
// ─────────────────────────────────────────────
interface DropdownMenuProps {
  items: DropdownItem[];
  isOpen: boolean;
  onItemClick?: () => void;
}

const DropdownMenu = ({ items, isOpen, onItemClick }: DropdownMenuProps) => (
  <div
    className={`dropdown-menu${isOpen ? " dropdown-menu--open" : ""}`}
    role="menu"
    aria-hidden={!isOpen}
  >
    {items.map((item) => (
      <a
        key={item.label}
        href={item.href}
        className="dropdown-item"
        role="menuitem"
        tabIndex={isOpen ? 0 : -1}
        onClick={onItemClick}
      >
        {item.label}
      </a>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Single nav link (with optional dropdown)
// ─────────────────────────────────────────────
const NavLink = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Active page detection — exact match for "/" home, prefix match for others
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isActive = item.href
    ? item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href)
    : false;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        className={`nav-link${isActive ? " nav-link--active" : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div
      ref={ref}
      className="nav-dropdown-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`nav-link nav-link--dropdown${isActive ? " nav-link--active" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => {
          // If this item also points somewhere (e.g. About Us → /About),
          // clicking the label navigates there. Hovering still opens the menu.
          if (item.href) {
            window.location.href = item.href;
          } else {
            setOpen((v) => !v);
          }
        }}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>
      <DropdownMenu
        items={item.dropdown}
        isOpen={open}
        onItemClick={() => setOpen(false)}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header>
        <nav
          className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
          aria-label="Main navigation"
        >
          <div className="navbar__inner">

            {/* ── Logo ── */}
            <a href="/" className="navbar__logo" aria-label="Green Karindo Elite – home">
              <img
                src={LogoImg}
                alt="Green Karindo Elite logo"
                className="navbar__logo-img"
              />
              <div className="navbar__logo-wordmark">
                <span className="navbar__logo-name">Green Karindo Elite</span>
                <span className="navbar__logo-tagline">Property Development</span>
              </div>
            </a>

            {/* ── Desktop links ── */}
            <ul className="navbar__links" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>

            {/* ── Mobile hamburger ── */}
            <button
              className="navbar__hamburger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>

          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-menu"
          className={`navbar__mobile-menu${mobileOpen ? " navbar__mobile-menu--open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          {NAV_ITEMS.map((item, i) => (
            <div key={item.label}>
              {i > 0 && <div className="mobile-divider" />}

              {!item.dropdown ? (
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              ) : (
                <div className="mobile-dropdown-section">
                  <div className="mobile-dropdown-label">{item.label}</div>
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="mobile-dropdown-item"
                      onClick={() => setMobileOpen(false)}
                      tabIndex={mobileOpen ? 0 : -1}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;