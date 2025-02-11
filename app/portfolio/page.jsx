'use client';

import { useLanguage } from '../context/LanguageContext';
import { portfolioTranslations } from '../data/translations';
import { portfolioService } from '../services/api';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Portfolio() {
    const { language } = useLanguage();
    const t = portfolioTranslations[language];
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                setLoading(true);
                const data = await portfolioService.getAllPortfolios(language);
                setPortfolios(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, [language]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative py-24 bg-green-800 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/slider.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">{t.title}</h1>
                    <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {portfolios.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-green-800 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-green-50 hover:text-green-800 transition-colors duration-300"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
} 