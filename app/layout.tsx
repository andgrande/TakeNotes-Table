import { Suspense } from 'react';
import type { Metadata } from "next";
import { inter, karla } from './fonts';
import "./globals.css";
import Loading from './loading';

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
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {children}
      </body>
    </html>
  );
}
