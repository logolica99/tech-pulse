import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ToothlessPetLoader } from "@/components/toothless-pet-loader";
import { siteConfig } from "@/site.config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.owner.name,
  keywords: [
    "artificial intelligence",
    "energy",
    "batteries",
    "solar",
    "nuclear",
    "electric grid",
    "electric vehicles",
    "robotics",
    "space",
    "technology news",
  ],
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="flex min-h-full flex-col bg-bg font-serif text-fg">
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Header />
          <main id="content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <ToothlessPetLoader />
      </body>
    </html>
  );
}
