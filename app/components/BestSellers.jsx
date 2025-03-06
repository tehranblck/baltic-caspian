'use client';

import { useLanguage } from '../context/LanguageContext';
import { productsTranslations } from '../data/translations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from './ProductCard';

export default function BestSellers() {
    const { language } = useLanguage();
    const t = productsTranslations[language];
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts(language);
                setProducts(data.slice(0, 9)); // Sadece ilk 3 ürünü göster
            } catch (error) {
                console.error('Ürünler yüklenirken hata:', error);
            }
        };

        fetchProducts();
    }, [language]);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">{t.bestSellersTitle}</h2>
                    <p className="text-gray-600">{t.bestSellersSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/products"
                        className="inline-block px-8 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1"
                    >
                        {t.viewAll}
                    </Link>
                </div>
            </div>
        </section>
    );
} 