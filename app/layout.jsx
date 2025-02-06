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
  title: "Caspian Baltic | Taxta Evlər",
  description: "Caspian Baltic - Yüksək keyfiyyətli taxta evlər istehsalçısı. Təbiətlə harmoniyada yaşamaq üçün ən yaxşı seçim.",
  keywords: "taxta evlər, деревянные дома, wooden houses, caspian baltic, eco evlər, yaşayış evləri",
  authors: [{ name: "Caspian Baltic" }],
  creator: "Caspian Baltic",
  publisher: "Caspian Baltic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
    title: 'Caspian Baltic | Tahta Evlər',
    description: 'Yüksək keyfiyyətli taxta evlər istehsalçısı',
    url: 'https://caspianbaltic.com',
    siteName: 'Caspian Baltic',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Caspian Baltic Tahta Evlər',
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
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
