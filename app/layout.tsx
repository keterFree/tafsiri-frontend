import './globals.css';
import { AuthProvider } from './context/authcontext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tafsiri App',
  description: 'Translation tool powered by Firebase Auth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
