import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Wednesday Golf Club",
  description: "Escape the grid. Hit the greens. Every Wednesday.",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "manifest", url: "/site.webmanifest" },
    /* { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    { rel: "msapplication-TileColor", content: "#000000" },
    { rel: "theme-color", content: "#ffffff" }, */
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
