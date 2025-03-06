'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { galleryTranslations } from '../data/translations';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';

const baseURL = 'https://api.balticcaspian.com';

const GalleryPage = () => {
    const { language } = useLanguage();
    const t = galleryTranslations[language];
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('photos');
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Body scroll lock when modal is open
    useEffect(() => {
        if (selectedVideo || selectedPhoto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedVideo, selectedPhoto]);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                setLoading(true);
                // Fetch photos with locale filter in API
                const photosRes = await fetch(`${baseURL}/api/fotos?populate=*&locale=${language}`);
                const photosData = await photosRes.json();
                setPhotos(photosData.data || []);

                // Fetch videos with locale filter in API
                const videosRes = await fetch(`${baseURL}/api/videos?populate=*&locale=${language}`);
                const videosData = await videosRes.json();
                setVideos(videosData.data || []);

                console.log('Videos Data:', videosData);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryItems();
    }, [language]);

    const getResponsiveImageUrl = (image) => {
        if (!image) return '';

        // Ekran boyutuna göre uygun format seçimi
        if (image.formats) {
            if (window.innerWidth < 640) return baseURL + image.formats.small.url;
            if (window.innerWidth < 1024) return baseURL + image.formats.medium.url;
            return baseURL + image.formats.large.url;
        }

        return baseURL + image.url;
    };

    // Video modalını kapatmak için ESC tuşunu dinle
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setSelectedVideo(null);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    // Debug için ekran üzerinde dil ve veri durumunu göster
    console.log('Rendering with language:', language);
    console.log('Current photos:', photos);

    // Video Modal Component
    const VideoModal = ({ video, onClose }) => {
        if (!video) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={(e) => {
                    // Modal içeriğine tıklanmadığında kapat
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
                        className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2 text-white"
                        aria-label="Close modal"
                    >
                        <IoClose size={24} />
                    </button>

                    {/* Video Container */}
                    <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
                        <div className="aspect-video w-full">
                            <video
                                className="w-full h-full"
                                controls
                                autoPlay
                                playsInline
                                controlsList="nodownload"
                            >
                                <source src={baseURL + video.video?.url} type={video.video?.mime} />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Video Title */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="p-4 sm:p-6">
                                <h3 className="sr-only">
                                    {video.google_metni}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Photo Modal Component
    const PhotoModal = ({ photo, onClose }) => {
        if (!photo) return null;

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
                        className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2 text-white"
                        aria-label="Close modal"
                    >
                        <IoClose size={24} />
                    </button>

                    {/* Photo Container */}
                    <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src={baseURL + photo?.foto?.url}
                                alt={photo?.google_metni || ''}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="p-4 sm:p-6">
                                <h3 className="sr-only">
                                    {photo?.google_metni}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            {/* Gallery Tabs */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex rounded-lg border border-green-600 p-1">
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`px-6 py-3 rounded-md text-lg font-medium ${activeTab === 'photos'
                            ? 'bg-green-600 text-white'
                            : 'text-green-600 hover:bg-green-50'
                            } transition-colors`}
                    >
                        {t.photos}
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-3 rounded-md text-lg font-medium ${activeTab === 'videos'
                            ? 'bg-green-600 text-white'
                            : 'text-green-600 hover:bg-green-50'
                            } transition-colors`}
                    >
                        {t.videos}
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
            )}

            {/* Gallery Grid */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeTab === 'photos' &&
                        photos?.map((photo) => (
                            <div
                                key={photo.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <Image
                                        src={baseURL + photo?.foto?.url}
                                        alt={photo?.google_metni || ''}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <h3 className="sr-only">{photo?.google_metni || ''}</h3>
                                </div>
                            </div>
                        ))}

                    {activeTab === 'videos' &&
                        videos.map((video) => (
                            <div
                                key={video.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedVideo(video)}
                            >
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <div className="absolute inset-0">
                                        <Image
                                            src={getResponsiveImageUrl(video.cover_img)}
                                            alt={video.google_metni || ''}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-black/20 group-hover:to-black/60 transition-all duration-300"></div>
                                    <h3 className="sr-only">{video.google_metni || ''}</h3>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300 border-2 border-white/40 group-hover:border-green-500">
                                            <FaPlay className="text-white text-2xl ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Modals */}
            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
            <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

            {/* Empty State */}
            {!loading && activeTab === 'photos' && (!photos || photos.length === 0) && (
                <div className="text-center text-gray-500 py-12">{t.noPhotos}</div>
            )}
            {!loading && activeTab === 'videos' && (!videos || videos.length === 0) && (
                <div className="text-center text-gray-500 py-12">{t.noVideos}</div>
            )}
        </div>
    );
};

export default GalleryPage;