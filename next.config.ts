import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Redirections — rattrape les anciennes URLs WordPress / Foogra du site
   * précédent et envoie les visiteurs vers la bonne section du nouveau site.
   *
   * Permanent (308) pour les pages connues (Google met à jour son index).
   * Tout chemin inconnu tombe sur la page 404 personnalisée (app/not-found.tsx)
   * qui propose un retour à l'accueil.
   */
  async redirects() {
    return [
      // Pages WordPress habituelles
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },

      // Rubriques typiques d'un site WordPress de service local
      { source: '/accueil', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/a-propos', destination: '/', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/reservation', destination: '/#app', permanent: true },
      { source: '/reserver', destination: '/#app', permanent: true },
      { source: '/app', destination: '/#app', permanent: true },
      { source: '/tarifs', destination: '/#services', permanent: true },
      { source: '/prix', destination: '/#services', permanent: true },
      { source: '/horaires', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/tag/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
