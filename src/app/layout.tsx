import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wednesday Golf Club",
  description: "Escape the grid. Hit the greens. Every Wednesday.",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  appleWebApp: {
    capable: true,
    startupImage: "/wed-gc.jpg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} h-[100svh] w-screen flex-1 overflow-hidden overscroll-none`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#eee6d3" />

        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/wed-gc.jpg"
          media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </head>
      <body className="h-full w-full flex-1 overflow-auto">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
