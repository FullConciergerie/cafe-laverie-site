import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Manrope,
  Dancing_Script,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const dancing = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const SITE_URL = 'https://www.cafelaverie.fr';
const SITE_NAME = 'Café Laverie Nevers';
const DEFAULT_DESCRIPTION =
  "Café Laverie à Nevers — laverie nouvelle génération + café cosy quai de Mantoue. Réservez vos machines en ligne, téléchargez l'app avec jusqu'à 20 % de bonus, privatisez l'espace pour vos événements.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Café Laverie Nevers — Laverie nouvelle génération + café',
    template: '%s — Café Laverie Nevers',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'café laverie',
    'café laverie Nevers',
    'laverie Nevers',
    'laverie automatique Nevers',
    'laverie quai de Mantoue',
    'laverie linge animaux',
    'réservation machine laverie',
    'privatisation espace Nevers',
    'événement Nevers laverie',
    'ouvrir une laverie',
    'app laverie Nevers',
  ],
  authors: [{ name: 'Delil Torgursul', url: SITE_URL }],
  creator: 'Café Laverie Nevers',
  publisher: 'Café Laverie Nevers',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Café Laverie Nevers — Laverie nouvelle génération + café',
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Café Laverie Nevers',
    description: 'Laverie nouvelle génération + café cosy à Nevers.',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Laverie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${manrope.variable} ${dancing.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
