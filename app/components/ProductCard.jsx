'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { productsTranslations } from '../data/translations';

export default function ProductCard({ product }) {
    const { language } = useLanguage();
    const t = productsTranslations[language];

    return (
        <div className="h-full">
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
        </div>
    );
} 