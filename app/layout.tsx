import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "$PIDAY — The Infinite Meme Coin | piday.online",
  description:
    "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
