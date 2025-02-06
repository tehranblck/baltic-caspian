'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { HiOutlineBadgeCheck, HiOutlineCube, HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { aboutTranslations } from '../data/translations';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function About() {
    const { language } = useLanguage();
    const t = aboutTranslations[language];

    return (
        <motion.div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                className="relative py-16 md:py-24 bg-green-800 text-white overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about.jpg"
                        alt="About Caspian Baltic"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <motion.div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center">{t.title}</h1>
                    <p className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center mb-8 md:mb-16">
                    {/* Text Content */}
                    <motion.div
                        className="space-y-6"
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-gray-900">{t.mainTitle}</h2>
                        <p className="text-gray-600">{t.description1}</p>
                        <p className="text-gray-600">{t.description2}</p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/about2.jpg"
                            alt="Our Work"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
                    {[
                        { number: "8+", text: t.stats.experience },
                        { number: "200+", text: t.stats.projects },
                        { number: "180+", text: t.stats.clients },
                        { number: "25+", text: t.stats.team }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className="text-4xl font-bold text-green-800 mb-2"
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {stat.number}
                            </motion.div>
                            <div className="text-gray-600">{stat.text}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values */}
                <motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">{t.values.title}</h2>
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { icon: <HiOutlineBadgeCheck size={40} />, title: t.values.quality.title, desc: t.values.quality.description },
                            { icon: <HiOutlineCube size={40} />, title: t.values.eco.title, desc: t.values.eco.description },
                            { icon: <HiOutlineHome size={40} />, title: t.values.innovation.title, desc: t.values.innovation.description },
                            { icon: <HiOutlineUsers size={40} />, title: t.values.customer.title, desc: t.values.customer.description }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="text-green-800 mb-4"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {value.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
