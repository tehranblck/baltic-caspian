import ProductDetail from "../../components/ProductDetail";
import { products } from "../../data/products";

export default function ProductPage({ params }) {
    const { slug } = params;
    console.log("Slug:", slug);
    console.log("Available products:", products.map(p => p.slug));

    const product = products.find(p => p.slug === slug);
    console.log("Found product:", product);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Məhsul tapılmadı</h1>
                    <p>İstədiyiniz məhsul mövcud deyil.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductDetail productSlug={slug} />
        </div>
    );
}

// Static paths için
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
} 