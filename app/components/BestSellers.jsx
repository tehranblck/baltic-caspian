'use client';

import { useLanguage } from '../context/LanguageContext';
import { productsTranslations } from '../data/translations';
import { getProducts } from '../data/products';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineScale } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { productService } from '../services/api';

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

export default function BestSellers() {
    const { language } = useLanguage();
    const t = productsTranslations[language];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts(language);

                const sortedProducts = data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3);
                setProducts(sortedProducts);
                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [language]);


    if (loading) {
        return (
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t.bestSellersTitle}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto px-4">{t.bestSellersSubtitle}</p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map((product) => (
                        <motion.div
                            key={product?.id}
                            variants={item}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={product?.images?.[0] || '/placeholder.jpg'}
                                    alt={product?.name?.[language] || ''}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-green-800 transition-colors duration-300">
                                    {product?.name?.[language]}
                                </h3>
                                <div className="text-gray-600 mb-4">
                                    {product?.category?.[language]}
                                </div>
                                <Link
                                    href={`/products/${product?.slug}`}
                                    className="inline-block px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1"
                                >
                                    {t.viewDetails}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link
                        href="/products"
                        className="inline-block px-8 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1"
                    >
                        {t.viewAll}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
} 