'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineHome, HiOutlineScale, HiOutlineUsers } from 'react-icons/hi';
import { products, translations } from '../data/products';

export default function ProductDetail({ productSlug }) {
    const { language } = useLanguage();
    const t = translations[language];
    const [selectedImage, setSelectedImage] = useState(0);

    console.log("ProductDetail - Slug:", productSlug);
    const product = products.find(p => p.slug === productSlug);
    console.log("ProductDetail - Found product:", product);

    if (!product) {
        return <div>Məhsul tapılmadı</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Gallery Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                <div className="space-y-4">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name[language]}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative h-20 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-green-800' : ''
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name[language]} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name[language]}</h1>
                        <p className="text-gray-600 text-lg">{product.description[language]}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <HiOutlineHome className="w-6 h-6 text-green-800" />
                            <div>
                                <p className="text-sm text-gray-600">{t.size}</p>
                                <p className="font-semibold">{product.size}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineUsers className="w-6 h-6 text-green-800" />
                            <div>
                                <p className="text-sm text-gray-600">{t.rooms}</p>
                                <p className="font-semibold">{product.rooms}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineScale className="w-6 h-6 text-green-800" />
                            <div>
                                <p className="text-sm text-gray-600">{t.warranty}</p>
                                <p className="font-semibold">{product.specifications.warranty[language]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">{t.specifications}</h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">{t.construction}</span>{" "}
                                {product.specifications.construction[language]}
                            </p>
                            <p>
                                <span className="font-semibold">{t.buildTime}</span>{" "}
                                {product.specifications.buildTime[language]}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">{t.features}</h2>
                        <ul className="grid grid-cols-2 gap-2">
                            {product.features[language].map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold text-green-800">
                                {product.price[language]}
                            </div>
                            <button className="bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                                {t.contact}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 