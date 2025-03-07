'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const baseURL = 'https://api.balticcaspian.com';

const PhotoModal = ({ photo, photos, currentIndex, onClose, onNext, onPrev }) => {
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
                        aria-label="Previous photo"
                    >
                        <IoIosArrowBack size={28} />
                    </button>
                )}
                {currentIndex < photos.length - 1 && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 transition-colors rounded-full p-3 text-white z-50 shadow-lg hover:shadow-xl"
                        aria-label="Next photo"
                    >
                        <IoIosArrowForward size={28} />
                    </button>
                )}

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

export default function HomeGallery() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language } = useLanguage();

    // Body scroll lock when modal is open
    useEffect(() => {
        if (selectedPhoto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedPhoto]);

    // ESC tuşu ile modalı kapatma
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setSelectedPhoto(null);
                setCurrentIndex(0);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Klavye ile navigasyon
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!selectedPhoto) return;

            if (event.key === 'ArrowLeft' && currentIndex > 0) {
                handlePrev();
            } else if (event.key === 'ArrowRight' && currentIndex < photos.length - 1) {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, photos.length, selectedPhoto]);

    const handleNext = () => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedPhoto(photos[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setSelectedPhoto(photos[currentIndex - 1]);
        }
    };

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const photosRes = await fetch(`${baseURL}/api/fotos?populate=*&locale=${language}`);
                const photosData = await photosRes.json();
                setPhotos(photosData.data || []);
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [language]);

    const handlePhotoClick = (photo, index) => {
        setSelectedPhoto(photo);
        setCurrentIndex(index);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
            )}

            {/* Photo Grid */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {photos?.map((photo, index) => (
                        <div
                            key={photo.id}
                            className="group cursor-pointer"
                            onClick={() => handlePhotoClick(photo, index)}
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
                </div>
            )}

            {/* Empty State */}
            {!loading && (!photos || photos.length === 0) && (
                <div className="text-center text-gray-500 py-12">Henüz fotoğraf bulunmamaktadır.</div>
            )}

            {/* Photo Modal */}
            <PhotoModal
                photo={selectedPhoto}
                photos={photos}
                currentIndex={currentIndex}
                onClose={() => {
                    setSelectedPhoto(null);
                    setCurrentIndex(0);
                }}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </div>
    );
} 