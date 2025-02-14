'use client';

import { useLanguage } from '../context/LanguageContext';
import { contactTranslations } from '../data/translations';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineGlobeAlt } from 'react-icons/hi';
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

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Contact() {
    const { language } = useLanguage();
    const t = contactTranslations[language];

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

            {/* Contact Info */}
            <div className="container mx-auto px-4 -mt-16 relative z-10 pb-24">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {/* Address */}
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-green-800 mb-4">
                            <HiOutlineLocationMarker size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.address.title}</h3>
                        <p className="text-gray-600">{t.address.text}</p>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-green-800 mb-4">
                            <HiOutlinePhone size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.phone.title}</h3>
                        <div className="space-y-1">
                            <a href={`tel:${t.phone.text}`} className="text-gray-600 hover:text-green-800 block">
                                {t.phone.text}
                            </a>
                            <a href={`tel:${t.mobile.text}`} className="text-gray-600 hover:text-green-800 block">
                                {t.mobile.text}
                            </a>
                            <a href={`tel:${t.mobile2.text}`} className="text-gray-600 hover:text-green-800 block">
                                {t.mobile2.text}
                            </a>
                        </div>
                    </motion.div>

                    {/* Web */}
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-green-800 mb-4">
                            <HiOutlineGlobeAlt size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.web.title}</h3>
                        <a href={`https://${t.web.text}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-800">
                            {t.web.text}
                        </a>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-green-800 mb-4">
                            <HiOutlineMail size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.email.title}</h3>
                        <a href={`mailto:${t.email.text}`} className="text-gray-600 hover:text-green-800">
                            {t.email.text}
                        </a>
                    </motion.div>

                    {/* Work Hours */}
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-green-800 mb-4">
                            <HiOutlineClock size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.workHours.title}</h3>
                        <p className="text-gray-600">{t.workHours.text}</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
