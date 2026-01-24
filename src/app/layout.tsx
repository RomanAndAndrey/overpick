import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Overpick - Контрпики для Overwatch 2",
    template: "%s | Overpick"
  },
  description: "Лучший сервис для поиска контрпиков, изучения меты и патч-нотов Overwatch 2. Актуальные тир-листы Season 20.",
  keywords: ["overwatch 2", "контрпики", "мета", "герои", "патчи", "тир-лист", "counters", "tier list"],
  authors: [{ name: "Overpick Team" }],
  creator: "Overpick",
  publisher: "Overpick",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://overpick.gg",
    siteName: "Overpick",
    title: "Overpick - Контрпики для Overwatch 2",
    description: "Найди лучший контрпик для любого героя Overwatch 2. Актуальная мета Season 20.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overpick - Контрпики для Overwatch 2",
    description: "Найди лучший контрпик для любого героя Overwatch 2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F06414",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main-content" role="main" style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
