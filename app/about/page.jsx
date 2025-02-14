'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { HiOutlineBadgeCheck, HiOutlineCube, HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { aboutTranslations } from '../data/translations';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function About() {
    const { language } = useLanguage();
    const t = aboutTranslations[language];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative py-24 bg-green-800 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-50" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">{t.title}</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto space-y-8"
                >
                    {t.content.map((paragraph, index) => (
                        <motion.p
                            key={index}
                            variants={item}
                            className="text-lg text-gray-700 leading-relaxed"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.div>

                {/* Values Section */}

            </div>
        </div>
    );
}
