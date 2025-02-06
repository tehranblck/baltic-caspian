'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { contactTranslations } from '../data/translations';
import Image from 'next/image';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import { motion } from 'framer-motion';

// Animasyon varyantları
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Contact() {
    const { language } = useLanguage();
    const t = contactTranslations[language];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form gönderme işlemi burada yapılacak
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                className="relative py-16 md:py-24 bg-green-800 text-white overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/contact.jpg"
                        alt="Contact Caspian Baltic"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <motion.div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center">{t.title}</h1>
                    <p className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </motion.div>
            </motion.div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Contact Info */}
                    <motion.div className="space-y-6 md:space-y-8">
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                            {/* Info Cards with Hover Effect */}
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
                                <a href={`tel:${t.phone.text}`} className="text-gray-600 hover:text-green-800">
                                    {t.phone.text}
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

                        {/* Map with Fade In */}
                        <motion.div
                            className="bg-white p-4 rounded-xl shadow-md h-[300px] relative overflow-hidden"
                            variants={fadeIn}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.428774226704!2d49.86073661744384!3d40.37719999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9bdc74118f%3A0x4c16e9b5a3c06c96!2sXetai%2C%20Baku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1635789245251!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form inputs with subtle animations */}
                            <motion.div
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <label className="block text-gray-700 mb-2" htmlFor="name">
                                    {t.form.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.form.namePlaceholder}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
                                    required
                                />
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <label className="block text-gray-700 mb-2" htmlFor="email">
                                    {t.form.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t.form.emailPlaceholder}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
                                    required
                                />
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <label className="block text-gray-700 mb-2" htmlFor="phone">
                                    {t.form.phone}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t.form.phonePlaceholder}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
                                    required
                                />
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <label className="block text-gray-700 mb-2" htmlFor="message">
                                    {t.form.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t.form.messagePlaceholder}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
                                    required
                                ></textarea>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.form.send}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
