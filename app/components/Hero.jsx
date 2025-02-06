'use client';

import { useLanguage } from '../context/LanguageContext';
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const translations = {
    az: {
        title: "Təbiətlə Harmoniyada Yaşayın",
        subtitle: "Yüksək keyfiyyətli taxta evlər",
        description: "Caspian Baltic ilə əsrarəngiz taxta ev həyatını kəşf edin",
        button: "Məhsullarımız",
    },
    ru: {
        title: "Живите в гармонии с природой",
        subtitle: "Высококачественные деревянные дома",
        description: "Откройте для себя волшебство жизни в деревянном доме с Caspian Baltic",
        button: "Наши продукты",
    }
};

const slides = [
    {
        id: 1,
        image: "/slider.jpg",
    },

    {
        id: 2,
        image: "/slider2.jpg",
    },

    {
        id: 3,
        image: "/slider.jpg",
    }
];


export default function Hero() {
    const { language } = useLanguage();
    const t = translations[language];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        pauseOnHover: false,
        arrows: false,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="relative h-screen slider-container">
            <Slider {...settings} className="h-full slick-slider">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative h-screen">
                        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                        <Image
                            src={slide.image}
                            alt="House"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="text-center text-white max-w-4xl px-4">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {t.title}
                                </h1>
                                <h2 className="text-xl md:text-2xl mb-6">
                                    {t.subtitle}
                                </h2>
                                <p className="text-lg md:text-xl mb-8">
                                    {t.description}
                                </p>
                                <button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg transition duration-300 transform hover:scale-105">
                                    {t.button}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
} 