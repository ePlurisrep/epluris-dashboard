import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ePluris Dashboard",
  description: "Live dashboards and analytics — fiscal, congressional, and social signals.",
  icons: {
    icon: "/ePluris-logo.png",
    shortcut: "/ePluris-logo.png",
    apple: "/ePluris-logo.png",
  },
  openGraph: {
    title: "ePluris Dashboard",
    description: "Live dashboards and analytics — fiscal, congressional, and social signals.",
    images: [
      {
        url: "/ePluris-logo.png",
        width: 1200,
        height: 630,
        alt: "ePluris logo",
      },
    ],
    siteName: "ePluris",
  },
  twitter: {
    card: "summary_large_image",
    title: "ePluris Dashboard",
    description: "Live dashboards and analytics — fiscal, congressional, and social signals.",
    images: ["/ePluris-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
