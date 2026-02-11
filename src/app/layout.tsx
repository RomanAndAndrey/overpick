import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Overpick - Контрпики Overwatch",
    template: "%s | Overpick"
  },
  description: "Лучший сервис для поиска контрпиков, изучения меты и патч-нотов Overwatch. Актуальные тир-листы Season 1 (февраль 2026). Подроли, 5 новых героев.",
  keywords: ["overwatch", "контрпики", "мета", "герои", "патчи", "тир-лист", "counters", "tier list", "season 1", "подроли", "subroles"],
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
    url: "https://overpick-phi.vercel.app",
    siteName: "Overpick",
    title: "Overpick - Контрпики Overwatch",
    description: "Найди лучший контрпик для любого героя Overwatch. Актуальная мета Season 1.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overpick - Контрпики Overwatch",
    description: "Найди лучший контрпик для любого героя Overwatch",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050508",
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
        <main id="main-content" role="main" style={{ paddingTop: 'calc(var(--header-height) + 36px)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
