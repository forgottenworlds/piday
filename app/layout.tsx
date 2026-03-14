import type { Metadata, Viewport } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://piday.online"),
  title: "$PIDAY — The Infinite Meme Coin | piday.online",
  description:
    "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
  openGraph: {
    title: "$PIDAY — The Infinite Meme Coin | piday.online",
    description:
      "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
    url: "https://piday.online",
    siteName: "$PIDAY",
    images: [{ url: "/images/og_card.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$PIDAY — The Infinite Meme Coin | piday.online",
    description:
      "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
    images: ["/images/og_card.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16" },
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
    shortcut: "/images/favicon_io/favicon.ico",
  },
  manifest: "/images/favicon_io/site.webmanifest",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
