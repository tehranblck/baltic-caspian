'use client';

import { useLanguage } from '../context/LanguageContext';
import { homeTranslations } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineSparkles } from 'react-icons/hi';

const slides = [
    {
        id: 1,
        image: "/slider.jpg",
    },
    {
        id: 2,
        image: "/slider2.jpg",
    },
    {
        id: 3,
        image: "/slider.jpg",
    }
];

export default function Hero() {
    const { language } = useLanguage();
    const t = homeTranslations[language];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Otomatik slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
                {/* Slider Background */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt="Slider Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </motion.div>
                </AnimatePresence>

                {/* Slider Dots */}
                <div className="absolute bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.heroTitle}
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t.heroSubtitle}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link
                            href="/products"
                            className="w-full sm:w-auto bg-green-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition transform hover:-translate-y-1"
                        >
                            {t.viewProducts}
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto bg-white text-green-800 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1"
                        >
                            {t.contactUs}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.services.items.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-green-800 text-center mb-4">
                                    {index === 0 ? <HiOutlineHome size={40} /> :
                                        index === 1 ? <HiOutlineOfficeBuilding size={40} /> :
                                            <HiOutlineSparkles size={40} />}
                                </div>
                                <h3 className="text-xl font-bold">{service}</h3>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-16 bg-green-800 text-white rounded-xl p-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">{t.features.title}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {t.features.items.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg italic mt-6">{t.features.conclusion}</p>
                    </motion.div>
                </div>
            </div>
        </>
    );
} 