'use client';

import { useLanguage } from '../context/LanguageContext';
import { footerTranslations } from '../data/translations';
import Link from 'next/link';
import { HiOutlinePhone, HiOutlineMail, HiOutlineGlobeAlt, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { SOCIAL_LINKS } from '../constants';

export default function Footer() {
    const { language } = useLanguage();
    const t = footerTranslations[language];

    // WhatsApp linki güncellendi
    const whatsappLink = "https://wa.me/994553221109";

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t.about}</h3>
                        <p className="text-gray-400 mb-4">{t.aboutText}</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t.links.home}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition">
                                    {t.links.home}
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-400 hover:text-white transition">
                                    {t.links.products}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition">
                                    {t.links.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                                    {t.links.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t.links.contact}</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <HiOutlineLocationMarker className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">{t.address}</p>
                                    <p className="text-gray-400">{t.addressText}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <HiOutlinePhone className="w-5 h-5" />
                                    <a href={`tel:${t.contact.phone}`} className="hover:text-white transition">
                                        {t.contact.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlinePhone className="w-5 h-5" />
                                    <a href={`tel:${t.contact.mobile}`} className="hover:text-white transition">
                                        {t.contact.mobile}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlinePhone className="w-5 h-5" />
                                    <a href={`tel:${t.contact.mobile2}`} className="hover:text-white transition">
                                        {t.contact.mobile2}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlineMail className="w-5 h-5" />
                                    <a href={`mailto:${t.contact.email}`} className="hover:text-white transition">
                                        {t.contact.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlineGlobeAlt className="w-5 h-5" />
                                    <a href={`https://${t.contact.web}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                                        {t.contact.web}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section - Contact Info kısmından sonra ekleyin */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t.social}</h3>
                        <div className="flex space-x-6">
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaFacebookF className="w-6 h-6" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Baltic Caspian</h3>
                        <Image src="/logo.svg" width={150} height={150} alt="Baltic Caspian" className="w-32 mb-4" />
                        <p className="text-gray-400">
                            {language === 'az' ? 'Sibir şamından hazırlanmış keyfiyyətli taxta evlər' : 'Качественные деревянные дома из сибирской сосны'}
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} Baltic Caspian . {t.rights}
                        </p>
                        {/* Social Media Icons - Mobile */}
                        <div className="flex items-center space-x-6 md:hidden">
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
