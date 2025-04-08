'use client';

import Link from "next/link";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}