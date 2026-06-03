import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Know It Africa | AI Education & Digital Innovation",
    template: "%s | Know It Africa",
  },
  description:
    "Know It Africa positions Africans for global relevance through AI education, software development, robotics, and digital innovation programs.",
  applicationName: "Know It Africa",
  keywords: [
    "Know It Africa",
    "AI education Africa",
    "software development bootcamp",
    "digital innovation",
    "AI bootcamp Nigeria",
    "African tech academy",
  ],
  authors: [{ name: "Know It Africa" }],
  creator: "Know It Africa",
  publisher: "Know It Africa",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/know-it-africa-logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Know It Africa",
    title: "Know It Africa | AI Education & Digital Innovation",
    description:
      "Premium AI, software development, robotics, and digital innovation programs positioning Africans for global relevance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know It Africa | AI Education & Digital Innovation",
    description: "Positioning Africans for global relevance through AI education and digital innovation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071B4F",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
