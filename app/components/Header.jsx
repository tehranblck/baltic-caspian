'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { headerTranslations } from '../data/translations';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const t = headerTranslations[language];
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Sadece menü açıkken event listener'ı ekle
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Sayfa değiştiğinde menüyü kapat
    useEffect(() => {
        setIsOpen(false);
    }, [language]);

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <nav className="container mx-auto px-4" ref={menuRef}>
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-green-800">
                        <Image src="/logo.svg" priority quality={100} alt="logo" width={150} height={150} />
                    </Link>


                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-green-800 transition">
                            {t.home}
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-green-800 transition">
                            {t.products}
                        </Link>

                        <Link href="/about" className="text-gray-700 hover:text-green-800 transition">
                            {t.about}
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-green-800 transition">
                            {t.contact}
                        </Link>

                        {/* Language Switcher */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setLanguage('az')}
                                className={`px-2 py-1 rounded ${language === 'az' ? 'bg-green-800 text-white' : ' text-black bg-gray-200'}`}
                            >
                                AZ
                            </button>
                            <button
                                onClick={() => setLanguage('ru')}
                                className={`px-2 py-1 rounded ${language === 'ru' ? 'bg-green-800 text-white' : ' text-black bg-gray-200'}`}
                            >
                                RU
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-4 pb-4">
                        <Link
                            href="/"
                            className="block text-gray-700 hover:text-green-800 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.home}
                        </Link>
                        <Link
                            href="/products"
                            className="block text-gray-700 hover:text-green-800 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.products}
                        </Link>
                        <Link
                            href="/portfolio"
                            className="block text-gray-700 hover:text-green-800 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.portfolio}
                        </Link>
                        <Link
                            href="/about"
                            className="block text-gray-700 hover:text-green-800 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.about}
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-gray-700 hover:text-green-800 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.contact}
                        </Link>

                        {/* Mobile Language Switcher */}
                        <div className="flex space-x-2 pt-4">
                            <button
                                onClick={() => {
                                    setLanguage('az');
                                    setIsOpen(false);
                                }}
                                className={`px-2 py-1 rounded ${language === 'az' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                            >
                                AZ
                            </button>
                            <button
                                onClick={() => {
                                    setLanguage('ru');
                                    setIsOpen(false);
                                }}
                                className={`px-2 py-1 rounded ${language === 'ru' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                            >
                                RU
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
} 