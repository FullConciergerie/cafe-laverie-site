'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#app', label: 'App & Bonus' },
  { href: '#pickup', label: 'À domicile' },
  { href: '#pros', label: 'Pros' },
  { href: '#evenement', label: 'Événements' },
  { href: '#ouvrir', label: 'Entreprendre' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="nav-logo" aria-label="Café Laverie — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Café Laverie Nevers" />
        </a>

        <nav className="nav-menu" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="#reservation" className="btn btn-marron">
            <span>Réserver une machine</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
          <button
            className="nav-burger"
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-drawer" onClick={close}>
          <div className="nav-drawer-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="nav-drawer-close"
              onClick={close}
              aria-label="Fermer le menu"
              type="button"
            >
              ✕
            </button>
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={close}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a
              href="tel:+33661753738"
              className="drawer-tel"
              onClick={close}
            >
              📞 06 61 75 37 38
            </a>
            <a
              href="#reservation"
              onClick={close}
              className="btn btn-marron"
              style={{ justifyContent: 'center' }}
            >
              Réserver une machine
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
