'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { productDetailTranslations } from '../data/translations';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

export default function ProductDetail({ product }) {
    const { language } = useLanguage();
    const t = productDetailTranslations[language];
    const [selectedImage, setSelectedImage] = useState(0);

    const whatsappLink = `https://wa.me/994553221109?text=${encodeURIComponent(
        `${language === 'az' ? 'Salam, məni maraqlandırır:' : 'Здравствуйте, меня интересует:'} ${product?.name?.[language]}`
    )}`;

    const handleNext = () => {
        if (selectedImage < product?.images?.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const handlePrev = () => {
        if (selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Sol Taraf - Görsel Galerisi */}
                <div className="p-6 space-y-4">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={product?.images?.[selectedImage] || '/placeholder.jpg'}
                            alt={product?.name?.[language]}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Navigation Buttons */}
                        {selectedImage > 0 && (
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-3 text-white z-50 shadow-lg hover:shadow-xl"
                                aria-label="Previous image"
                            >
                                <IoArrowBack size={28} />
                            </button>
                        )}
                        {selectedImage < product?.images?.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-3 text-white z-50 shadow-lg hover:shadow-xl"
                                aria-label="Next image"
                            >
                                <IoArrowForward size={28} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product?.images?.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${selectedImage === index ? 'border-green-800' : 'border-transparent'}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product?.name?.[language]} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sağ Taraf - Bilgiler */}
                <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {product?.category?.[language]}
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900">
                            {product?.name?.[language]}
                        </h1>

                        <div className="h-px w-full bg-gradient-to-r from-green-800/20 to-transparent" />
                    </div>

                    <div className="mt-auto">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 w-full bg-green-800 text-white p-4 rounded-xl hover:bg-green-700 transition-all duration-300"
                        >
                            <FaWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-lg font-medium">{t.contact}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 