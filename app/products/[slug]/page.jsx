import ProductPageClient from './ProductPageClient';
import { productService } from '../../services/api';

// Server Component
export default async function ProductPage({ params }) {
    try {
        // Server-side veri çekme
        const product = await productService.getProductBySlug(params.slug, 'az'); // Varsayılan dil

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="h-[30vh] relative bg-green-800">
                    {/* Dekoratif arka plan */}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-green-800 opacity-90" />
                    <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20" />
                </div>
                <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
                    <ProductPageClient initialProduct={product} slug={params.slug} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Ürün getirme hatası:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-xl">
                    Məhsul yüklənərkən xəta baş verdi
                </div>
            </div>
        );
    }
}

// Statik yolları oluştur
export async function generateStaticParams() {
    try {
        const products = await productService.getAllProducts();
        return products.map((product) => ({
            slug: product.slug,
        }));
    } catch (error) {
        console.error('Static paths oluşturma hatası:', error);
        return [];
    }
} 