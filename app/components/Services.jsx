'use client';

import { useLanguage } from '../context/LanguageContext';
import { homeTranslations } from '../data/translations';
import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineSparkles } from 'react-icons/hi';

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

export default function Services() {
    const { language } = useLanguage();
    const t = homeTranslations[language];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4">{t.services.title}</h2>
                    <p className="text-xl text-gray-600">{t.services.subtitle}</p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {t.services.items.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <div className="text-green-800 mb-4">
                                {index === 0 ? <HiOutlineHome size={40} /> :
                                    index === 1 ? <HiOutlineOfficeBuilding size={40} /> :
                                        <HiOutlineSparkles size={40} />}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{service}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features */}
                <motion.div
                    className="bg-green-800 text-white rounded-xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-6">{t.features.title}</h3>
                    <ul className="space-y-4 mb-6">
                        {t.features.items.map((feature, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start gap-3"
                                variants={item}
                            >
                                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <p className="text-lg italic">{t.features.conclusion}</p>
                </motion.div>
            </div>
        </section>
    );
} 