'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { HiOutlineBadgeCheck, HiOutlineCube, HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { aboutTranslations } from '../data/translations';

export default function About() {
    const { language } = useLanguage();
    const t = aboutTranslations[language];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative py-24 bg-green-800 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about.jpg"
                        alt="About Caspian Baltic"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">{t.title}</h1>
                    <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">{t.subtitle}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">{t.mainTitle}</h2>
                        <p className="text-gray-600">{t.description1}</p>
                        <p className="text-gray-600">{t.description2}</p>
                    </div>

                    {/* Image */}
                    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src="/about.jpg"
                            alt="Our Work"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-4xl font-bold text-green-800 mb-2">8+</div>
                        <div className="text-gray-600">{t.stats.experience}</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-4xl font-bold text-green-800 mb-2">200+</div>
                        <div className="text-gray-600">{t.stats.projects}</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-4xl font-bold text-green-800 mb-2">180+</div>
                        <div className="text-gray-600">{t.stats.clients}</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-4xl font-bold text-green-800 mb-2">25+</div>
                        <div className="text-gray-600">{t.stats.team}</div>
                    </div>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">{t.values.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <div className="text-green-800 mb-4">
                                <HiOutlineBadgeCheck size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.values.quality.title}</h3>
                            <p className="text-gray-600">{t.values.quality.description}</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <div className="text-green-800 mb-4">
                                <HiOutlineCube size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.values.eco.title}</h3>
                            <p className="text-gray-600">{t.values.eco.description}</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <div className="text-green-800 mb-4">
                                <HiOutlineHome size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.values.innovation.title}</h3>
                            <p className="text-gray-600">{t.values.innovation.description}</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <div className="text-green-800 mb-4">
                                <HiOutlineUsers size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.values.customer.title}</h3>
                            <p className="text-gray-600">{t.values.customer.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
