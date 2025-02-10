import ProductPageClient from './ProductPageClient';
import { productService } from '../../services/api';

// Server Component
export default async function ProductPage({ params }) {
    try {
        // Server-side veri çekme
        const product = await productService.getProductBySlug(params.slug, 'az'); // Varsayılan dil

        // Client component'e props olarak geç
        return <ProductPageClient initialProduct={product} slug={params.slug} />;
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