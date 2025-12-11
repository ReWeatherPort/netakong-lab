import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "NetaKong Lab | Markets, Data & AI Experiments",
  description: "Turning markets, data, and content into experiments that actually ship. Polymarket analysis, trading strategies, data science, and web development.",
  keywords: ["polymarket", "crypto", "data science", "web development", "trading", "AI"],
  authors: [{ name: "Bryan / Weather" }],
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "NetaKong Lab",
    description: "Markets, Data & AI Experiments",
    type: "website",
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
