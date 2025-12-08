import React from "react";

export default function ProductCard({ product, onAdd, children, isLoading }) {

    return (
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="mb-4 flex-shrink-0">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-contain rounded-lg" 
                />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                {product.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                </span>
                <button
                    onClick={() => onAdd(product)}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]">
                    {children || "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
