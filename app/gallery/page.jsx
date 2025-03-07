'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

const baseURL = 'https://api.balticcaspian.com';

const GalleryPage = () => {
    const { language } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseURL}/api/qalereyas?populate=*&locale=${language}`);
                const data = await response.json();
                setProjects(data.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [language]);

    const getResponsiveImageUrl = (media) => {
        if (!media) return '';
        if (media.formats) {
            if (window.innerWidth < 640) return baseURL + media.formats.small.url;
            if (window.innerWidth < 1024) return baseURL + media.formats.medium.url;
            return baseURL + media.formats.large.url;
        }
        return baseURL + media.url;
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-12">
            <h1 className="text-3xl font-bold text-center mb-12">
                {language === 'az' ? 'Layihələrimiz' : 'Наши проекты'}
            </h1>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
            )}

            {/* Projects Grid */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/gallery/${project.slug}`}
                            className="group block"
                        >
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <Image
                                    src={getResponsiveImageUrl(project.media?.[0])}
                                    alt={project.ad}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h2 className="text-white text-xl font-semibold">{project.ad}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && (!projects || projects.length === 0) && (
                <div className="text-center text-gray-500 py-12">
                    {language === 'az' ? 'Layihə tapılmadı' : 'Проекты не найдены'}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;