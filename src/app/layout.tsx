import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from "@/components/Providers";
import {Toaster} from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPdf-AI-Image",
  description: "Chat with PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <Providers>
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
    </Providers>
    </ClerkProvider>
  );
}
