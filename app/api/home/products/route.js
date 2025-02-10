import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // URL'den locale parametresini al
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'az'; // Varsayılan olarak 'az'

        const response = await fetch(`https://api.balticcaspian.com/api/products?populate=*&locale=${locale}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 } // Her saat başı cache'i yenile
        });

        if (!response.ok) {
            throw new Error('API isteği başarısız oldu');
        }

        const data = await response.json();

        // API'den gelen veriyi frontend için dönüştür
        const transformedData = data.data.map(item => ({
            id: item.id,
            slug: item.documentId,
            name: {
                [locale]: item.basliq,
            },
            description: {
                [locale]: item.aciqlama,
            },
            size: item.sahe,
            rooms: item.otaq_sayi,
            price: {
                [locale]: `${item.qiymet} AZN`,
            },
            specifications: {
                warranty: {
                    [locale]: item.zemanet,
                },
                construction: {
                    [locale]: item.insaat_materiali,
                },
                buildTime: {
                    [locale]: item.tikilme_muddeti,
                }
            },
            features: {
                [locale]: item.ozelliklers.map(ozellik => ozellik.ozellik),
            },
            images: item.images.map(image =>
                `https://api.balticcaspian.com${image.formats?.large?.url || image.url}`
            )
        }));

        return NextResponse.json(transformedData);

    } catch (error) {
        console.error('API Hatası:', error);
        return NextResponse.json(
            { error: locale === 'az' ? 'Məlumatları əldə edərkən xəta baş verdi' : 'Ошибка при получении данных' },
            { status: 500 }
        );
    }
}
