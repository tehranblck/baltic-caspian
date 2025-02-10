'use client';

import { useLanguage } from '../../context/LanguageContext';
import { productService } from '../../services/api';
import ProductDetail from '../../components/ProductDetail';
import { useEffect, useState } from 'react';

export default function ProductPageClient({ initialProduct, slug }) {
    const { language } = useLanguage();
    const [product, setProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Dil değiştiğinde yeni dilde veriyi getir
        const fetchProduct = async () => {
            if (language === 'az' && initialProduct) {
                setProduct(initialProduct);
                return;
            }

            try {
                setLoading(true);
                const data = await productService.getProductBySlug(slug, language);
                if (!data) {
                    throw new Error(language === 'az' ? 'Məhsul tapılmadı' : 'Продукт не найден');
                }
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, language, initialProduct]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-xl">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 text-xl">
                    {language === 'az' ? 'Məhsul tapılmadı' : 'Продукт не найден'}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <ProductDetail product={product} />
            </div>
        </div>
    );
} 