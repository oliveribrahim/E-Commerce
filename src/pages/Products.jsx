import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useSearch } from "../contexts/SearchContext"; // Add this

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { addToPurchases } = useCart();
    const { searchTerm } = useSearch(); // Get search term from context
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingProductId, setLoadingProductId] = useState(null);

    useEffect(() => {
        let mounted = true;
        setInitialLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then(r => r.json())
            .then(data => {
                if (!mounted) return;
                setProducts(data);
                setInitialLoading(false);
            })
            .catch(err => {
                if (!mounted) return;
                setError("Failed to load products");
                setInitialLoading(false);
            });
        return () => { mounted = false; };
    }, []);

    // Filter products based on search term (case-insensitive)
    const filteredProducts = useMemo(() => {
        // If no search term, show all products
        if (!searchTerm || searchTerm.trim() === "") {
            return products;
        }

        // Case-insensitive search - convert both search term and product fields to lowercase
        const term = searchTerm.trim().toLowerCase();
        return products.filter(product => {
            const title = product.title?.toLowerCase() || "";
            const description = product.description?.toLowerCase() || "";
            const category = product.category?.toLowerCase() || "";

            return title.includes(term) ||
                   description.includes(term) ||
                   category.includes(term);
        });
    }, [products, searchTerm]);

    const handleAddToCart = (product) => {
        setLoadingProductId(product.id);
        addToPurchases(product);
        setTimeout(() => setLoadingProductId(null), 500);
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg text-gray-600">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Products</h2>
                {searchTerm && (
                    <p className="text-gray-600">
                        Found {filteredProducts.length} result(s) for "{searchTerm}"
                    </p>
                )}
                {!searchTerm && (
                    <p className="text-gray-600">Browse our collection of amazing products</p>
                )}
            </div>

            {filteredProducts.length === 0 && searchTerm ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredProducts.map(p => (
                        <ProductCard 
                            key={p.id} 
                            product={p} 
                            onAdd={handleAddToCart}
                            isLoading={loadingProductId === p.id}
                        >
                            {loadingProductId === p.id ? (
                                <div 
                                    className="rotating-square"
                                    role="status"
                                    aria-label="rotating-square-loading"
                                ></div>
                            ) : (
                                "Add to Cart"
                            )}
                        </ProductCard>
                    ))}
                </div>
            )}
        </section>
    );
}