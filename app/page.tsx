import { Nav } from './components/Nav';
import { ReservationPetForm } from './components/ReservationPetForm';
import { OpenLaverieForm } from './components/OpenLaverieForm';
import { EventRequestForm } from './components/EventRequestForm';
import { HomePickupForm } from './components/HomePickupForm';
import { ProLinenForm } from './components/ProLinenForm';
import { CollapsibleForm } from './components/CollapsibleForm';

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <span className="eyebrow">◆ Café Laverie · Nevers · Quai de Mantoue</span>
              <h1>
                Laverie nouvelle
                <br />
                <span className="vert">génération</span>
                <br />
                <span className="marron-cursive">&amp; café cosy.</span>
              </h1>
              <p className="lede">
                Un lieu unique à Nevers où l&apos;on lave son linge dans une ambiance
                café chaleureuse. Machines de pointe, wifi gratuit, espace
                privatisable pour vos événements — la laverie comme on l&apos;avait
                rarement imaginée.
              </p>
              <div className="hero-actions">
                <a href="#app" className="btn btn-marron">
                  <span>Réserver via l&apos;app</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a href="#pickup" className="btn btn-outline">
                  <span>Linge à domicile</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/devanture.jpg" alt="Café Laverie Nevers — devanture quai de Mantoue" />
              <div className="hero-badge">
                <span className="num">+20<span className="pct">%</span></span>
                <span className="label">Bonus sur l&apos;app</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ BANDEAU INFO ═══════════════════ */}
        <div className="band-info">
          <span>Ouvert sur demande</span>
          <span>16 Quai de Mantoue · 58000 Nevers</span>
          <span>03 76 15 02 27</span>
        </div>

        {/* ═══════════════════ SERVICES (4 piliers) ═══════════════════ */}
        <section className="bg-creme" id="services">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 01 — L&apos;expérience</span>
              <h2>
                Plus qu&apos;une laverie.
                <br />
                <em>Un lieu de vie.</em>
              </h2>
              <p className="lede">
                Quatre piliers qui font la différence entre un passage forcé chez le
                laveur du coin et un vrai moment pour soi.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>

            <div className="services-grid">
              <ServiceCard
                num="01"
                title="Café cosy"
                body="Café, thés, jus à 20 centimes. Mobilier confortable, wifi gratuit, prises électriques. Travaillez ou détendez-vous pendant le cycle."
              />
              <ServiceCard
                num="02"
                title="Machines de pointe"
                body="Lave-linge de 8 à 18 kg, sèche-linge professionnels. Couettes, oreillers, gros volumes — rien ne nous fait peur."
              />
              <ServiceCard
                num="03"
                title="Service à domicile"
                body="Dépôt et récupération du linge à domicile sur Nevers — la lessive sans bouger de chez vous."
              />
              <ServiceCard
                num="04"
                title="Espace privatisable"
                body="Vernissages, présentations, ateliers, anniversaires : on transforme l'espace café en lieu d'événement sur demande."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════ APP / BONUS 20% ═══════════════════ */}
        <section className="bg-creme-2" id="app">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 02 — App, réservation &amp; bonus</span>
              <h2>
                Réservez votre machine,
                <br />
                <em>gagnez jusqu&apos;à 20&nbsp;%.</em>
              </h2>
              <p className="lede">
                Toute la laverie tient dans une application. Téléchargez-la
                directement sur place en scannant le QR code à la borne — c&apos;est
                gratuit, et chaque rechargement vous offre un bonus pouvant aller
                jusqu&apos;à 20&nbsp;%.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>

            <div className="app-section">
              <div className="app-text">
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <BenefitLine><strong>Réservez vos machines de chez vous</strong>, avant même d&apos;arriver à la laverie.</BenefitLine>
                  <BenefitLine>Rechargez votre carte sur l&apos;app, et profitez du bonus jusqu&apos;à 20&nbsp;%.</BenefitLine>
                  <BenefitLine>Suivez la disponibilité des machines en temps réel.</BenefitLine>
                  <BenefitLine>Recevez une notification quand votre cycle est terminé.</BenefitLine>
                </ul>
                <div className="app-stats">
                  <div className="app-stat">
                    <span className="v">+20<span className="pct">%</span></span>
                    <span className="l">Bonus max sur rechargement</span>
                  </div>
                  <div className="app-stat">
                    <span className="v">0<span className="pct">€</span></span>
                    <span className="l">Téléchargement gratuit</span>
                  </div>
                  <div className="app-stat">
                    <span className="v">24/7</span>
                    <span className="l">Accès à votre compte</span>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <a
                    href="https://lmcpay.touchnpay.fr/fr/qr-code/30dwf38lxkgzpa5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-marron"
                  >
                    <span>Télécharger l&apos;application</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="app-card">
                <span className="cursive-tag">Bonus</span>
                <div className="bonus">
                  +20<span className="pct">%</span>
                </div>
                <p className="bonus-text">
                  Sur chaque rechargement effectué via l&apos;application —
                  cumulable, sans plafond, valable sur toutes les machines.
                </p>
                <p className="qr-note">
                  📱 Scannez le QR code à la borne pour télécharger
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ COLLECTE LINGE À DOMICILE ═══════════════════ */}
        <section className="bg-creme" id="pickup">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 03 — Collecte à domicile</span>
              <h2>
                Votre linge,
                <br />
                <em>chez vous.</em>
              </h2>
              <p className="lede">
                Pas le temps de passer&nbsp;? Nous venons chercher votre linge
                directement chez vous, on le lave avec soin dans notre laverie, et
                on vous le restitue plié, prêt à ranger. Sur Nevers et alentours.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>

            <div
              style={{
                marginTop: 48,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 32,
                paddingBottom: 24,
                borderBottom: '1px solid var(--ligne)',
              }}
            >
              <PickupFeature
                num="01"
                title="On vient chercher"
                text="Sur RDV, créneau de votre choix. Vous laissez vos sacs, on s'occupe du reste."
              />
              <PickupFeature
                num="02"
                title="On lave avec soin"
                text="Machines pro, tri par couleur et matière, séchage adapté. Linge délicat sur demande."
              />
              <PickupFeature
                num="03"
                title="On vous le rapporte"
                text="Plié, propre, prêt à ranger. À l'heure convenue, sans surprise."
              />
              <PickupFeature
                num="04"
                title="Tarif clair"
                text="Au poids ou au forfait. Devis transparent sous 24h après votre demande."
              />
            </div>

            <CollapsibleForm
              ctaTitle="Programmer une collecte à domicile"
              ctaDescription="Renseignez votre adresse, votre volume et un créneau — devis sous 24h."
              ctaLabel="Programmer ma collecte"
            >
              <HomePickupForm />
            </CollapsibleForm>
          </div>
        </section>

        {/* ═══════════════════ PROS / B2B ═══════════════════ */}
        <section className="bg-vert" id="pros">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 04 — Professionnels</span>
              <h2>
                Pour les pros&nbsp;:
                <br />
                <em>hôtels, gîtes, restaurants…</em>
              </h2>
              <p className="lede">
                Hôtels, B&amp;B, gîtes Airbnb, restaurants, salons de coiffure,
                cabinets, crèches&nbsp;: nous lavons et livrons votre linge
                professionnel à la fréquence qui vous convient — devis sur mesure
                selon votre volume.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>

            <div
              style={{
                marginTop: 48,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 32,
                paddingBottom: 32,
                borderBottom: '1px solid rgba(251,248,242,0.18)',
                color: 'rgba(251, 248, 242, 0.85)',
              }}
            >
              <ProFeature
                num="01"
                title="Volume sur mesure"
                text="De 20 kg à plus de 200 kg / semaine, on dimensionne avec vous."
              />
              <ProFeature
                num="02"
                title="Fréquence flexible"
                text="Quotidienne, hebdo, à la demande. On s'adapte à votre activité."
              />
              <ProFeature
                num="03"
                title="Qualité hôtelière"
                text="Lavage soigné, conditionnement propre, traçabilité. Le standard pro."
              />
              <ProFeature
                num="04"
                title="Collecte + livraison"
                text="Service complet possible — vous n'avez plus à vous en soucier."
              />
            </div>

            <CollapsibleForm
              variant="dark"
              ctaTitle="Demander un devis professionnel"
              ctaDescription="Volume, fréquence, type de linge — on construit ensemble un devis sur mesure sous 48h."
              ctaLabel="Demander un devis pro"
            >
              <ProLinenForm />
            </CollapsibleForm>
          </div>
        </section>

        {/* ═══════════════════ ÉVÉNEMENTS / PRIVATISATION ═══════════════════ */}
        <section className="bg-vert" id="evenement">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 05 — Privatisation</span>
              <h2>
                Votre événement
                <br />
                <em>dans un lieu unique.</em>
              </h2>
              <p className="lede">
                Présentation de bijoux en collaboration avec une créatrice, vernissage
                d&apos;artiste, atelier, anniversaire intime : l&apos;espace café se
                transforme sur demande pour vos événements.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>

            <div className="event-grid">
              <div className="event-visual">
                <span className="scribble">Sur demande.</span>
                <span className="label">Espace privatisable</span>
              </div>
              <div className="event-text">
                <p style={{ fontSize: 17, color: 'rgba(251, 248, 242, 0.78)', lineHeight: 1.65 }}>
                  Nous avons déjà accueilli des collaborations comme la présentation
                  de bijoux d&apos;une créatrice locale. L&apos;ambiance, la lumière
                  douce, le mobilier chaleureux — tout y est pour faire de votre
                  événement un moment mémorable.
                </p>
                <ul className="event-list" style={{ color: 'rgba(251, 248, 242, 0.88)', borderTopColor: 'rgba(251,248,242,0.18)' }}>
                  <li>Vernissages d&apos;artistes &amp; expositions éphémères</li>
                  <li>Présentations / lancements produits</li>
                  <li>Ateliers créatifs en petit comité</li>
                  <li>Anniversaires &amp; moments privés (jusqu&apos;à 30 personnes)</li>
                </ul>
              </div>
            </div>

            <CollapsibleForm
              variant="dark"
              ctaTitle="Privatiser l'espace pour votre événement"
              ctaDescription="Parlez-nous de votre projet — vernissage, présentation, atelier, anniversaire. Réponse sous 48h."
              ctaLabel="Privatiser l'espace"
            >
              <EventRequestForm />
            </CollapsibleForm>
          </div>
        </section>

        {/* ═══════════════════ LINGE ANIMAUX ═══════════════════ */}
        <section className="bg-creme-2" id="animaux">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 06 — Linge animaux</span>
              <h2>
                Réservez vos <em>épillettes</em>
                <br />
                pour le linge de vos compagnons.
              </h2>
              <p className="lede">
                Coussins, couvertures, vêtements, harnais : votre animal mérite un
                linge propre et sain. Réservez le nombre d&apos;épillettes
                nécessaire — équipement adapté, sans risque de contamination avec
                le linge des autres clients.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>
            <CollapsibleForm
              ctaTitle="Réserver mes épillettes"
              ctaDescription="Choisissez le nombre d'épillettes, le type de linge et la date — confirmation sous 24h."
              ctaLabel="Réserver mes épillettes"
            >
              <ReservationPetForm />
            </CollapsibleForm>
          </div>
        </section>

        {/* ═══════════════════ OUVRIR UNE LAVERIE ═══════════════════ */}
        <section className="bg-marron" id="ouvrir">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">◆ 07 — Entreprendre</span>
              <h2>
                Lancez votre propre
                <br />
                <em>Café Laverie.</em>
              </h2>
              <p className="lede">
                Vous voulez ouvrir un Café Laverie dans votre ville&nbsp;? Nous
                avons construit le modèle à Nevers — méthode rodée, retour
                d&apos;expérience, accompagnement opérationnel. Postulez pour un
                appel découverte de 30 minutes, gratuit.
              </p>
              <span className="gold-rule" aria-hidden="true" />
            </div>
            <CollapsibleForm
              variant="dark"
              ctaTitle="Postuler pour un appel découverte"
              ctaDescription="30 minutes gratuites avec Delil pour cadrer votre projet et votre marché local."
              ctaLabel="Demander un appel découverte"
            >
              <OpenLaverieForm />
            </CollapsibleForm>
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="main">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-name">Café Laverie</span>
              <p>
                La laverie nouvelle génération à Nevers, où l&apos;on conjugue
                lessive et café cosy — quai de Mantoue, dans une ambiance unique.
              </p>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+33376150227">03 76 15 02 27</a></li>
                <li><a href="mailto:contact@cafe-laverie.fr">contact@cafe-laverie.fr</a></li>
                <li>16 Quai de Mantoue<br />58000 Nevers</li>
                <li><strong>Sur demande</strong> — Pas d&apos;horaires fixes</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Particuliers</h4>
              <ul>
                <li><a href="#app">Réserver via l&apos;app</a></li>
                <li><a href="#pickup">Collecte à domicile</a></li>
                <li><a href="#animaux">Linge animaux</a></li>
                <li><a href="#evenement">Privatisation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Professionnels</h4>
              <ul>
                <li><a href="#pros">Hôtels &amp; gîtes</a></li>
                <li><a href="#pros">Restaurants</a></li>
                <li><a href="#pros">Salons / cabinets</a></li>
                <li><a href="#evenement">Privatiser l&apos;espace</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Entreprendre</h4>
              <ul>
                <li><a href="#ouvrir">Ouvrir une laverie →</a></li>
                <li>
                  <a
                    href="https://full-nevers-conciergerie.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Full Conciergerie →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bot">
            <small>© {new Date().getFullYear()} Café Laverie Nevers · Tous droits réservés</small>
            <small>Conçu avec soin à Nevers</small>
          </div>
        </footer>
      </main>
    </>
  );
}

function ServiceCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <article className="service-card">
      <span className="service-num">{num}</span>
      <h3 className="service-title">{title}</h3>
      <p className="service-body">{body}</p>
    </article>
  );
}

function PickupFeature({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--marron-cafe)',
        }}
      >
        {num}
      </span>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--texte-mute)', lineHeight: 1.55 }}>
        {text}
      </p>
    </div>
  );
}

function ProFeature({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--marron-claire)',
        }}
      >
        {num}
      </span>
      <h3
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 22,
          lineHeight: 1.2,
          color: 'var(--ivoire)',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(251, 248, 242, 0.7)', lineHeight: 1.55 }}>
        {text}
      </p>
    </div>
  );
}

function BenefitLine({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        fontSize: 16,
        color: 'var(--texte)',
        lineHeight: 1.55,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 28,
          height: 1,
          marginTop: 14,
          background: 'var(--marron-cafe)',
        }}
      />
      <span>{children}</span>
    </li>
  );
}
