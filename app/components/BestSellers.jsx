'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { products, translations } from '../data/products';

export default function BestSellers() {
    const { language } = useLanguage();
    const t = translations[language];

    // İlk 9 ürünü göster
    const bestSellers = products.slice(0, 9);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t.bestSellersTitle}</h2>
                    <p className="text-gray-600 mb-8">{t.bestSellersSubtitle}</p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name[language]}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{product.name[language]}</h3>
                                <p className="text-gray-600 mb-6">{product.description[language]}</p>

                                <div className="flex justify-between items-center mb-6 text-sm">
                                    <div className="text-gray-600">
                                        <div className="mb-2">
                                            {product.rooms} {t.rooms}
                                        </div>
                                        <div>
                                            {product.size}
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-green-800">
                                        {product.price[language]}
                                    </div>
                                </div>

                                <Link
                                    href={`/products/${product.slug}`}
                                    className="block w-full text-center bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1"
                                >
                                    {t.viewDetails}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-green-800 hover:text-green-700 transition"
                    >
                        {t.viewAll}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
} 