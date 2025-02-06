'use client';

import { useLanguage } from '../context/LanguageContext';
import { homeTranslations } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <div className="w-6 h-10 border-2 border-white rounded-full p-1">
                    <div className="w-1 h-3 bg-white rounded-full mx-auto" />
                </div>
            </motion.div>
        </div>
    );
} 