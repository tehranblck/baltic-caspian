'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineHome, HiOutlineScale } from 'react-icons/hi';
import { products, translations } from '../data/products';

export default function ProductsList() {
    const { language } = useLanguage();
    const t = translations[language];
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    // Filtreleme fonksiyonu
    const filteredProducts = products.filter(product => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'small' && parseInt(product.size) < 100) return true;
        if (selectedFilter === 'medium' && parseInt(product.size) >= 100 && parseInt(product.size) < 150) return true;
        if (selectedFilter === 'large' && parseInt(product.size) >= 150) return true;
        return false;
    });

    // Sıralama fonksiyonu
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseInt(a.price[language].replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price[language].replace(/[^0-9]/g, ''));
        const sizeA = parseInt(a.size);
        const sizeB = parseInt(b.size);

        switch (sortBy) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'size-asc':
                return sizeA - sizeB;
            case 'size-desc':
                return sizeB - sizeA;
            default:
                return 0;
        }
    });

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
                            key={product.id}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name[language]}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-800 transition">
                                    {product.name[language]}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {product.description[language]}
                                </p>

                                {/* Features */}
                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <HiOutlineHome className="w-5 h-5" />
                                        <span>{product.rooms} {t.rooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <HiOutlineScale className="w-5 h-5" />
                                        <span>{product.size}</span>
                                    </div>
                                </div>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-green-800">
                                        {product.price[language]}
                                    </div>
                                    <Link
                                        href={`/products/${product.slug}`}
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