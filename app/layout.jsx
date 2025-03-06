import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Baltic Caspian | Taxta Evlər",
  description: "Baltic Caspian - Yüksək keyfiyyətli taxta evlər istehsalçısı. Təbiətlə harmoniyada yaşamaq üçün ən yaxşı seçim.",
  keywords: "taxta evlər, деревянные дома, wooden houses, Baltic Caspian, eco houses, yaşayış evləri",
  authors: [{ name: "Baltic Caspian" }],
  creator: "Baltic Caspian",
  publisher: "Baltic Caspian",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Baltic Caspian | Taxta Evlər',
    description: 'Yüksək keyfiyyətli taxta evlər istehsalçısı',
    url: 'https://balticcaspian.com',
    siteName: 'Baltic Caspian',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Baltic Caspian Taxta Evlər',
      },
    ],
    locale: 'az_AZ',
    type: 'website',
  },
  alternates: {
    languages: {
      'az-AZ': '/az',
      'ru-RU': '/ru',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main >
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
