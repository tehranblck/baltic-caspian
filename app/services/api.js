const API_URL = 'https://api.balticcaspian.com';

export const productService = {
    async getAllProducts(locale = 'az') {
        try {
            const response = await fetch(`${API_URL}/api/products?populate=*&locale=${locale}`);
            if (!response.ok) {
                throw new Error('Məhsulları yükləmək mümkün olmadı');
            }
            const data = await response.json();
            return this.transformProducts(data.data);
        } catch (error) {
            console.error('API xətası:', error);
            return [];
        }
    },

    async getProductBySlug(slug, locale = 'az') {
        try {
            const response = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
            if (!response.ok) {
                throw new Error('Məhsul tapılmadı');
            }
            const data = await response.json();
            if (data.data.length === 0) {
                return null;
            }
            return this.transformProducts(data.data)[0];
        } catch (error) {
            console.error('API xətası:', error);
            return null;
        }
    },

    transformProducts(data) {
        return data.map(item => ({
            id: item.id,
            documentId: item.documentId,
            slug: item.slug,
            name: {
                [item.locale]: item.layihe_adi,
                ...(item.localizations?.[0] && {
                    [item.localizations[0].locale]: item.localizations[0].layihe_adi
                })
            },
            category: {
                [item.locale]: item.kateqoriya_adi,
                ...(item.localizations?.[0] && {
                    [item.localizations[0].locale]: item.localizations[0].kateqoriya_adi
                })
            },
            images: item.images.map(image =>
                `${API_URL}${image.formats?.large?.url || image.url}`
            ),
            // Resim formatlarını da saklayalım
            imageFormats: item.images.map(image => ({
                thumbnail: `${API_URL}${image.formats?.thumbnail?.url}`,
                small: `${API_URL}${image.formats?.small?.url}`,
                medium: `${API_URL}${image.formats?.medium?.url}`,
                large: `${API_URL}${image.formats?.large?.url}`,
                original: `${API_URL}${image.url}`
            })),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));
    }
};

export const portfolioService = {
    async getAllPortfolios(locale = 'az') {
        try {
            const response = await fetch(`${API_URL}/api/portfolios?populate=*&locale=${locale}`);
            if (!response.ok) {
                throw new Error('Portfolio yükləmək mümkün olmadı');
            }
            const data = await response.json();
            return this.transformPortfolios(data.data);
        } catch (error) {
            console.error('Portfolio API xətası:', error);
            return [];
        }
    },

    transformPortfolios(data) {
        return data.map(item => ({
            id: item.id,
            documentId: item.documentId,
            title: item.adi,
            description: item.aciqlama,
            size: item.sahe,
            rooms: item.otaq_sayi,
            extraFeature: item.elave_ozellik,
            image: `${API_URL}${item.fotolar?.formats?.large?.url || item.fotolar?.url}`,
            features: [
                `${item.sahe}m²`,
                `${item.otaq_sayi} ${item.locale === 'az' ? 'otaq' : 'комнат'}`,
                item.elave_ozellik
            ],
            createdAt: item.createdAt
        }));
    }
}; 