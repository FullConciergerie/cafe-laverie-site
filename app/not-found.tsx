import Link from 'next/link';

/**
 * Page 404 personnalisée — design Café Laverie.
 *
 * Affichée quand un visiteur arrive sur une URL inexistante
 * (vieux lien WordPress, favori obsolète, lien cassé d'un site tiers).
 * Propose un retour clair à l'accueil + lien direct vers les sections clés.
 */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        background: 'var(--creme)',
        color: 'var(--charbon)',
        gap: 32,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 580 }}>
        <span className="eyebrow" style={{ justifyContent: 'center', alignSelf: 'center' }}>
          ◆ Page introuvable
        </span>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          On a cherché
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--marron-cafe)' }}>
            cette page partout.
          </em>
        </h1>
        <p
          style={{
            fontSize: 17,
            color: 'var(--texte-mute)',
            lineHeight: 1.6,
            maxWidth: '50ch',
            margin: '0 auto',
          }}
        >
          Cette page n&apos;existe pas (ou plus). C&apos;est peut-être un vieux lien ou un
          favori du précédent site. Pas grave — on vous remet sur la route.
        </p>
        <span
          aria-hidden="true"
          style={{
            width: 64,
            height: 1,
            background: 'var(--marron-cafe)',
            display: 'block',
            margin: '8px auto 0',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <Link href="/" className="btn btn-marron">
          <span>Retour à l&apos;accueil</span>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link href="/#app" className="btn btn-outline">
          <span>Télécharger l&apos;app</span>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        style={{
          marginTop: 40,
          paddingTop: 32,
          borderTop: '1px solid var(--ligne)',
          width: '100%',
          maxWidth: 580,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--texte-mute)',
          }}
        >
          Ou contactez-nous directement
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="tel:+33376150227"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 18,
              color: 'var(--marron-cafe)',
            }}
          >
            📞 03 76 15 02 27
          </a>
          <a
            href="mailto:contact@cafe-laverie.fr"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 18,
              color: 'var(--marron-cafe)',
            }}
          >
            ✉ contact@cafe-laverie.fr
          </a>
        </div>
      </div>
    </main>
  );
}
