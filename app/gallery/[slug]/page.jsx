'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Image from 'next/image';
import { IoClose, IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';

const baseURL = 'https://api.balticcaspian.com';

const ProjectPage = ({ params }) => {
    const { language } = useLanguage();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Unwrap params using React.use()
    const slug = React.use(params).slug;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseURL}/api/qalereyas?filters[slug][$eq]=${slug}&populate=*&locale=${language}`);
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    setProject(data.data[0]);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [slug, language]);

    // Body scroll lock when modal is open
    useEffect(() => {
        if (selectedMedia) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedMedia]);

    const handleMediaClick = (media, index) => {
        setSelectedMedia(media);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (selectedMedia && currentIndex < project.media.length - 1) {
            handleMediaClick(project.media[currentIndex + 1], currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (selectedMedia && currentIndex > 0) {
            handleMediaClick(project.media[currentIndex - 1], currentIndex - 1);
        }
    };

    // Media Modal Component
    const MediaModal = ({ media, onClose, onNext, onPrev }) => {
        if (!media) return null;

        const isVideo = media.mime?.startsWith('video/');

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={(e) => {
                    if (!e.target.closest('.modal-content')) {
                        onClose();
                    }
                }}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

                {/* Modal Content */}
                <div className="relative w-full max-w-5xl mx-auto z-10 modal-content">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-2 text-white"
                        aria-label="Close modal"
                    >
                        <IoClose size={24} />
                    </button>

                    {/* Navigation Buttons */}
                    {currentIndex > 0 && (
                        <button
                            onClick={onPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-3 text-white z-50 shadow-lg hover:shadow-xl"
                            aria-label="Previous media"
                        >
                            <IoArrowBack size={28} />
                        </button>
                    )}
                    {currentIndex < project.media.length - 1 && (
                        <button
                            onClick={onNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-3 text-white z-50 shadow-lg hover:shadow-xl"
                            aria-label="Next media"
                        >
                            <IoArrowForward size={28} />
                        </button>
                    )}

                    {/* Media Container */}
                    <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
                        {isVideo ? (
                            <div className="aspect-video w-full">
                                <video
                                    className="w-full h-full"
                                    controls
                                    autoPlay
                                    playsInline
                                    controlsList="nodownload"
                                >
                                    <source src={baseURL + media.url} type={media.mime} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={baseURL + media?.url}
                                    alt={project.ad}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 mt-24">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-8 mt-24">
                <div className="text-center text-gray-500 py-12">
                    {language === 'az' ? 'Layihə tapılmadı' : 'Проект не найден'}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            <h1 className="text-3xl font-bold text-center mb-12">{project.ad}</h1>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.media?.map((media, index) => (
                    <div
                        key={media.id}
                        className="group cursor-pointer"
                        onClick={() => handleMediaClick(media, index)}
                    >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            {media.mime?.startsWith('video/') ? (
                                <>
                                    <div className="absolute inset-0">
                                        <Image
                                            src={baseURL + project.media.find(m => !m.mime?.startsWith('video/'))?.url || media.formats?.thumbnail?.url}
                                            alt={project.ad}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-black/20 group-hover:to-black/60 transition-all duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300 border-2 border-white/40 group-hover:border-green-500">
                                            <FaPlay className="text-white text-2xl ml-1" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Image
                                        src={baseURL + media.url}
                                        alt={project.ad}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Media Modal */}
            <MediaModal
                media={selectedMedia}
                onClose={() => setSelectedMedia(null)}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </div>
    );
};

export default ProjectPage;
