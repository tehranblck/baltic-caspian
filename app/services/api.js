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
            const response = await fetch(`${API_URL}/api/products?filters[documentId][$eq]=${slug}&populate=*&locale=${locale}`);
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
            slug: item.documentId,
            name: {
                [item.locale]: item.basliq,
            },
            description: {
                [item.locale]: item.aciqlama,
            },
            size: item.sahe,
            rooms: item.otaq_sayi,
            price: {
                [item.locale]: `${item.qiymet} AZN`,
            },
            specifications: {
                warranty: {
                    [item.locale]: item.zemanet,
                },
                construction: {
                    [item.locale]: item.insaat_materiali,
                },
                buildTime: {
                    [item.locale]: item.tikilme_muddeti,
                }
            },
            features: {
                [item.locale]: item.ozelliklers.map(ozellik => ozellik.ozellik),
            },
            images: item.images.map(image =>
                `${API_URL}${image.formats?.large?.url || image.url}`
            ),
            createdAt: item.createdAt
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