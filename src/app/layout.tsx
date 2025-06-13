/**
 * Updated by Pulao
 * date: 5/24/2025
 * Used the MatineDev theme.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/layouts/Index";
import '@mysten/dapp-kit/dist/index.css';
import '@mantine/core/styles.css';
import "./globals.css";


import { APP_DESCRIPTION, APP_TITLE } from "@/utils/consistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
