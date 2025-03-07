'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { headerTranslations, topBarTranslations } from '../data/translations';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const t = headerTranslations[language];
    const topBarT = topBarTranslations[language];
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [language]);

    return (
        <>
            {/* TopBar */}
            <div className="bg-white shadow-sm w-full ">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex sm:flex-col md:flex-row items-center justify-between">
                        {/* Logo */}
                        <div className=" md:mb-0">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/logo1.png"
                                    alt="Baltic Caspian Logo"
                                    width={200}
                                    height={70}
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col md:flex-row items-center sm:gap-4">
                            <div className="flex items-center sm:gap-6">
                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/994503221109"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" hidden sm:flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    <FaWhatsapp className="mr-2 text-xl" />
                                    <span>{topBarT.whatsapp}</span>
                                </a>

                                {/* Project Button */}
                                <a
                                    href="/contact"
                                    className=" hidden sm:flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    <span>{topBarT.contact}</span>
                                </a>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="text-right">
                                    <span className="text-gray-600 hidden sm:block">Baku Azerbaijan</span>
                                </div>
                                <a
                                    href="tel:+994553221109"
                                    className="text-xl font-semibold text-green-600 hover:text-green-700"
                                >
                                    (994 55) 322 11 09

                                </a>
                                <a
                                    href="mailto:info@balticcaspian.az"
                                    className="text-gray-600 hidden sm:block hover:text-green-600"
                                >
                                    info@balticcaspian.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <header className="bg-green-700 w-full z-40">
                <nav className="container mx-auto px-4 lg:px-8" ref={menuRef}>
                    <div className="flex items-center justify-between">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex py-4 items-center justify-between w-full">
                            <div className="flex items-center ds space-x-4 lg:space-x-8 xl:space-x-32">
                                <Link href="/" className="text-white hover:text-gray-200 transition uppercase text-sm lg:text-base">
                                    {t.home}
                                </Link>
                                <Link href="/products" className="text-white hover:text-gray-200 transition uppercase text-sm lg:text-base">
                                    {t.products}
                                </Link>
                                <Link href="/gallery" className="text-white hover:text-gray-200 transition uppercase text-sm lg:text-base">
                                    {t.gallery}
                                </Link>
                                <Link href="/about" className="text-white hover:text-gray-200 transition uppercase text-sm lg:text-base">
                                    {t.about}
                                </Link>
                                <Link href="/contact" className="text-white hover:text-gray-200 transition uppercase text-sm lg:text-base">
                                    {t.contact}
                                </Link>
                            </div>

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setLanguage('az')}
                                    className={`px-3 py-1 rounded transition-colors text-sm lg:text-base ${language === 'az'
                                        ? 'bg-white text-green-600'
                                        : 'text-white hover:bg-green-500'
                                        }`}
                                >
                                    AZ
                                </button>
                                <button
                                    onClick={() => setLanguage('ru')}
                                    className={`px-3 py-1 rounded transition-colors text-sm lg:text-base ${language === 'ru'
                                        ? 'bg-white text-green-600'
                                        : 'text-white hover:bg-green-500'
                                        }`}
                                >
                                    RU
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-green-600 mt-2 space-y-1 pb-4">
                            <Link
                                href="/"
                                className="block text-white hover:text-gray-200 transition py-3 px-4 text-base"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.home}
                            </Link>
                            <Link
                                href="/products"
                                className="block text-white hover:text-gray-200 transition py-3 px-4 text-base"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.products}
                            </Link>
                            <Link
                                href="/gallery"
                                className="block text-white hover:text-gray-200 transition py-3 px-4 text-base"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.gallery}
                            </Link>
                            <Link
                                href="/about"
                                className="block text-white hover:text-gray-200 transition py-3 px-4 text-base"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.about}
                            </Link>
                            <Link
                                href="/contact"
                                className="block text-white hover:text-gray-200 transition py-3 px-4 text-base"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.contact}
                            </Link>

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center justify-center space-x-4 px-4 pt-4">
                                <button
                                    onClick={() => {
                                        setLanguage('az');
                                        setIsOpen(false);
                                    }}
                                    className={`px-4 py-2 rounded transition-colors text-base ${language === 'az'
                                        ? 'bg-white text-green-600'
                                        : 'text-white hover:bg-green-500'
                                        }`}
                                >
                                    AZ
                                </button>
                                <button
                                    onClick={() => {
                                        setLanguage('ru');
                                        setIsOpen(false);
                                    }}
                                    className={`px-4 py-2 rounded transition-colors text-base ${language === 'ru'
                                        ? 'bg-white text-green-600'
                                        : 'text-white hover:bg-green-500'
                                        }`}
                                >
                                    RU
                                </button>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
} 