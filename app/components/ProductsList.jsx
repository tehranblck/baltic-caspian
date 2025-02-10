'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiOutlineHome, HiOutlineScale } from 'react-icons/hi';
import { translations, getProducts } from '../data/products';
import { productService } from '../services/api';

export default function ProductsList() {
    const { language } = useLanguage();
    const t = translations[language];
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts(language);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [language]);

    // Filtreleme fonksiyonu
    const filteredProducts = products.filter(product => {
        if (selectedFilter === 'all') return true;
        const size = parseInt(product.size);
        if (selectedFilter === 'small' && size < 100) return true;
        if (selectedFilter === 'medium' && size >= 100 && size < 150) return true;
        if (selectedFilter === 'large' && size >= 150) return true;
        return false;
    });

    // Sıralama fonksiyonu güvenlik kontrolleri ile
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Fiyat için güvenlik kontrolü
        const priceA = a?.price?.[language]?.replace(/[^0-9]/g, '') || '0';
        const priceB = b?.price?.[language]?.replace(/[^0-9]/g, '') || '0';

        // Size için güvenlik kontrolü
        const sizeA = parseInt(a?.size || '0');
        const sizeB = parseInt(b?.size || '0');

        switch (sortBy) {
            case 'price-asc': return parseInt(priceA) - parseInt(priceB);
            case 'price-desc': return parseInt(priceB) - parseInt(priceA);
            case 'size-asc': return sizeA - sizeB;
            case 'size-desc': return sizeB - sizeA;
            default: return 0;
        }
    });

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">
            {error}
        </div>;
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

            {/* Filters Section */}
            <div className="bg-white shadow-md py-6 sticky top-16 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Size Filters */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className={`px-4 py-2 rounded-full transition ${selectedFilter === 'all'
                                    ? 'bg-green-800 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {t.all}
                            </button>
                            <button
                                onClick={() => setSelectedFilter('small')}
                                className={`px-4 py-2 rounded-full transition ${selectedFilter === 'small'
                                    ? 'bg-green-800 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {t.smallHouses}
                            </button>
                            <button
                                onClick={() => setSelectedFilter('medium')}
                                className={`px-4 py-2 rounded-full transition ${selectedFilter === 'medium'
                                    ? 'bg-green-800 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {t.mediumHouses}
                            </button>
                            <button
                                onClick={() => setSelectedFilter('large')}
                                className={`px-4 py-2 rounded-full transition ${selectedFilter === 'large'
                                    ? 'bg-green-800 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {t.largeHouses}
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                        >
                            <option value="default">{t.sortBy}</option>
                            <option value="price-asc">{t.priceAsc}</option>
                            <option value="price-desc">{t.priceDesc}</option>
                            <option value="size-asc">{t.sizeAsc}</option>
                            <option value="size-desc">{t.sizeDesc}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map((product) => (
                        <div
                            key={product?.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={product?.images?.[0] || '/placeholder.jpg'}
                                    alt={product?.name?.[language] || ''}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    {product?.name?.[language]}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {product?.description?.[language]}
                                </p>
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <HiOutlineHome className="w-5 h-5" />
                                        <span>{product?.rooms} {t.rooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <HiOutlineScale className="w-5 h-5" />
                                        <span>{product?.size}m²</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-green-800">
                                        {product?.price?.[language]}
                                    </div>
                                    <Link
                                        href={`/products/${product?.slug}`}
                                        className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1"
                                    >
                                        {t.viewDetails}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 