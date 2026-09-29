import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "../data/site";
import { cx } from "../lib/utils";

const NAV_ITEMS = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-300",
        scrolled
          ? "border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm py-2"
          : "border-transparent bg-transparent py-4",
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Link
          to="/#top"
          className="font-display text-lg font-medium tracking-tight text-[var(--text)]"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="/#projects"
            className="rounded-full border border-[var(--accent)] px-4 py-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            View Projects
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--text)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-base text-[var(--text)] hover:bg-[var(--surface)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
