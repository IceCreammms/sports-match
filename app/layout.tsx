import { ReactLenis } from "lenis/react";

import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const maruMega = localFont({
  src: "./fonts/GT-Maru-Mega.woff2",
  variable: "--font-maru-mega",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <html lang="en" className="min-h-full h-full">
        <body
          className={`${satoshi.variable} ${maruMega.variable} antialiased h-full`}
        >
          {children}
        </body>
      </html>
    </ReactLenis>
  );
}
