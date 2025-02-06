'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const translations = {
    az: {
        about: "Haqqımızda",
        aboutText: "Caspian Baltic - Azərbaycanda keyfiyyətli taxta evlərin lider istehsalçısı",
        products: "Məhsullar",
        contact: "Əlaqə",
        address: "Ünvan",
        addressText: "Bakı şəhəri, Xətai rayonu",
        phone: "Telefon",
        email: "E-poçt",
        rights: "Bütün hüquqlar qorunur",
        links: {
            home: "Ana Səhifə",
            products: "Məhsullar",
            about: "Haqqımızda",
            contact: "Əlaqə"
        }
    },
    ru: {
        about: "О нас",
        aboutText: "Caspian Baltic - ведущий производитель качественных деревянных домов в Азербайджане",
        products: "Продукты",
        contact: "Контакты",
        address: "Адрес",
        addressText: "город Баку, Хатаинский район",
        phone: "Телефон",
        email: "Эл. почта",
        rights: "Все права защищены",
        links: {
            home: "Главная",
            products: "Продукты",
            about: "О нас",
            contact: "Контакты"
        }
    }
};

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-16">
                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="relative h-12 w-48">
                            <Image
                                src="/logo.png"
                                alt="Caspian Baltic"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm">
                            {t.aboutText}
                        </p>
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-white transition">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-white transition">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://wa.me/yourphone" target="_blank" rel="noopener noreferrer"
                                className="hover:text-white transition">
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">{t.links.home}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-white transition">
                                    {t.links.home}
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white transition">
                                    {t.links.products}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    {t.links.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    {t.links.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">{t.products}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/products/aile-evi-classic" className="hover:text-white transition">
                                    Ailə Evi Classic
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/premium-villa" className="hover:text-white transition">
                                    Premium Villa
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/smart-villa" className="hover:text-white transition">
                                    Smart Villa
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white transition">
                                    {t.links.products}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">{t.contact}</h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="font-bold">{t.address}:</span><br />
                                {t.addressText}
                            </li>
                            <li>
                                <span className="font-bold">{t.phone}:</span><br />
                                <a href="tel:+994501234567" className="hover:text-white transition">
                                    +994 50 123 45 67
                                </a>
                            </li>
                            <li>
                                <span className="font-bold">{t.email}:</span><br />
                                <a href="mailto:info@caspianbaltic.az" className="hover:text-white transition">
                                    info@caspianbaltic.az
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>© {currentYear} Caspian Baltic. {t.rights}.</p>
                </div>
            </div>
        </footer>
    );
}
