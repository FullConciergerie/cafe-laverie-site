'use client';

import { useRef, useState } from 'react';

/**
 * Wrapper qui cache un formulaire derrière un bouton CTA.
 *
 * Au chargement : on n'affiche qu'une carte avec un titre, une ligne de
 * description et un bouton. Quand l'utilisateur clique sur le bouton,
 * le formulaire s'ouvre en dessous (slide-down) et la page scroll
 * doucement vers le formulaire.
 */
export function CollapsibleForm({
  ctaLabel,
  ctaTitle,
  ctaDescription,
  variant = 'light',
  children,
}: {
  ctaLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  /** light = bouton marron sur fond clair (sections ivoire/crème). dark = bouton sur fond vert/marron foncé. */
  variant?: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
    // Smooth scroll vers le formulaire après l'animation de slide-down
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  };

  return (
    <div className="collapsible-wrap" ref={containerRef}>
      {!open && (
        <div className={`collapsible-cta ${variant === 'dark' ? 'is-dark' : ''}`}>
          <div className="collapsible-cta-text">
            <h3 className="collapsible-cta-title">{ctaTitle}</h3>
            <p className="collapsible-cta-desc">{ctaDescription}</p>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className={variant === 'dark' ? 'btn btn-ghost-light' : 'btn btn-marron'}
          >
            <span>{ctaLabel}</span>
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      )}

      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
}
