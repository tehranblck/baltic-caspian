'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

const translations = {
    az: {
        title: " Baltic Caspian Haqqında",
        subtitle: "Keyfiyyətli Taxta Evlər",
        description: "BALTIC CASPIAN LTD 2008-ci ildə yaradılmışdır. Əsas fəaliyyətimiz ağacın kəsilməsi və rəndələnməsidir.Təsisçilərimiz 1998-ci ildən ev tikintisində ağac emalı və yapışdırılmış tirlərin istehsalı sahəsində ixtisaslaşmışdır.Müştərinin istəyinə uyğun olaraq fərdi qaydada evlər, yay evləri, hamamlar və s. istehsal olunur.BALTIC CASPIAN LTD Rusiyadan şam və küknar ağacı idxal edir. Ağac çeşidlənir, qurudulur və ondan müxtəlif profillər istehsal olunur: döşəmə taxtası, daxili və xarici işlər üçün vaqonka, terras taxtaları.İstehsalatda yeni rəndələmə maşınlarından istifadə olunur ki, bu da həm daxili, həm də xarici bazarda satış üçün böyük həcmdə məhsul istehsal etməyə imkan verir.Palıd ağacının massivindən döşəmə üçün palıd taxtalar hazırlanır. Bu, müxtəlif otaqlar üçün nəzərdə tutulmuş ekoloji təmiz, uzunömürlü, zərif döşəmədir.Qapılar da massiv ağacdan hazırlanır. Biz palıd, göyrüş və şam ağacından istifadə edirik. Müştəri lazımi ölçüləri təqdim edə, model və rəngi seçə bilər.",
        experience: "İl təcrübə",
        projects: "Tamamlanmış layihə",
        clients: "Məmnun müştəri",
        quality: "Keyfiyyət zəmanəti",
        readMore: "Daha Ətraflı",
        features: [
            {
                title: "Ekoloji Təmiz",
                description: "100% təbii materiallardan hazırlanmış evlər"
            },
            {
                title: "Peşəkar Komanda",
                description: "Təcrübəli mütəxəssislərdən ibarət komanda"
            },
            {
                title: "Sürətli Tikinti",
                description: "2-5 ay ərzində təhvil"
            },
            {
                title: "Zəmanət",
                description: "Bütün evlərə 10+ il zəmanət"
            }
        ]
    },
    ru: {
        title: "О Baltic Caspian",
        subtitle: "Качественные Деревянные Дома",
        description: "BALTIC CASPIAN LTD была создана в 2008 году. Наша основная деятельность - резка дерева, строгание. Учредители специализируются на обработке древесины и клееных балок в строительстве домов с 1998 года. Индивидуально, в соответствии с желанием клиента, производятся дома, летние домики, бани и т.д. BALTIC CASPIAN LTD импортирует сосновую и еловую древесину из России. Дерево сортируется, сушится и из него производятся различные профили: доска для пола, вагонка для внутренних и наружных работ, доски для террас. В производстве используются новые стругальные машины, которые позволяют изготовить большой объем продукции для реализации как на внутреннем, так и на внешнем рынке. Из массива дуба изготавливаются дубовые доски для пола. Это экологически чистый, долговечный, элегантный пол, предназначенный для различных помещений. Из массива дерева изготавливаются и двери. Мы используем дуб, ясень, сосну. Клиент может предоставить необходимые размеры, выбрать модель и цвет.",
        experience: "Лет опыта",
        projects: "Завершенных проектов",
        clients: "Довольных клиентов",
        quality: "Гарантия качества",
        readMore: "Подробнее",
        features: [
            {
                title: "Экологически Чистые",
                description: "Дома из 100% натуральных материалов"
            },
            {
                title: "Профессиональная Команда",
                description: "Команда опытных специалистов"
            },
            {
                title: "Быстрое Строительство",
                description: "Сдача в течение 2-5 месяцев"
            },
            {
                title: "Гарантия",
                description: "Гарантия 10+ лет на все дома"
            }
        ]
    }
};

export default function About() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="py-20 hidden sm:block bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-xl text-gray-600">{t.subtitle}</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Image Side */}
                    <div className="relative h-[500px] rounded-xl overflow-hidden">
                        <Image
                            src="/about.jpg"
                            alt="Baltic Caspian"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {t.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="text-4xl font-bold text-green-800 mb-2">16+</div>
                                <div className="text-gray-600">{t.experience}</div>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="text-4xl font-bold text-green-800 mb-2">200+</div>
                                <div className="text-gray-600">{t.projects}</div>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="text-4xl font-bold text-green-800 mb-2">180+</div>
                                <div className="text-gray-600">{t.clients}</div>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="text-4xl font-bold text-green-800 mb-2">100%</div>
                                <div className="text-gray-600">{t.quality}</div>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            className="inline-block bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            {t.readMore}
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.features.map((feature, index) => (
                        <div key={index} className="p-6 bg-gray-50 rounded-xl">
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 