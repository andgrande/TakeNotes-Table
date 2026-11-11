import { Suspense } from 'react';
import type { Metadata } from "next";
import { inter, karla } from './fonts';
import "./globals.css";
import Loading from './loading';
import { AuthProvider } from './_lib/auth/AuthProvider';
import AuthGate from './components/AuthGate';

export const metadata: Metadata = {
  title: "My References",
  description: "References taken during my researches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${karla.className}`}>
        {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
        <AuthProvider>
          <AuthGate>{children}</AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
