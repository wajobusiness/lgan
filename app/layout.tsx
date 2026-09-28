import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Ladies Golf Association of Nigeria (LGAN) | Official Digital Platform',
  description: 'The official digital governance, membership, tournament, and marketplace platform of the Ladies Golf Association of Nigeria (LGAN). Host of the 2026 All Africa Challenge Trophy (AACT).',
  keywords: ['LGAN', 'Ladies Golf Nigeria', 'AACT 2026', 'Nigerian Golf', 'Women Golf Africa', 'IBB Golf Club', 'Golf Union of Africa'],
  authors: [{ name: 'Ladies Golf Association of Nigeria' }],
  openGraph: {
    title: 'Ladies Golf Association of Nigeria (LGAN)',
    description: 'Empowering Nigerian women through golf, world-class championships, and digital membership.',
    url: 'https://lgan.org.ng',
    siteName: 'LGAN Official Platform',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Ladies Golf Association of Nigeria',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;800&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
