import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Certificate Generator',
  description: 'Buat sertifikat massal dengan mudah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
