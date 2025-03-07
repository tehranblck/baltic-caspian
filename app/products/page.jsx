'use client';

import { useLanguage } from '../context/LanguageContext';
import { productsTranslations } from '../data/translations';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
    const { language } = useLanguage();
    const t = productsTranslations[language];
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts(language);
                setProducts(data);

                // Benzersiz kategorileri çıkar
                const uniqueCategories = [...new Set(data.map(product => product.category[language]))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Ürünler yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [language]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category[language] === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div style={{ backgroundImage: 'url(/forest.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="relative py-20 bg-green-800 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-50" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">{t.title}</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </div>
            </div>

            {/* Category Filters */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 rounded-full transition-all ${selectedCategory === 'all'
                            ? 'bg-green-800 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {t.all}
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category
                                ? 'bg-green-800 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
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
            </div>
        </div>
    );
} 