import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Placecat',
  description: 'Placecat is a simple and free service for generating placeholder images of cats.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Pretendard-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="font-pretendard bg-slate-900">{children}</body>
    </html>
  );
}
