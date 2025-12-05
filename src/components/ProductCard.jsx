import React from "react";

export default function ProductCard({ product, onAdd }) {
    return (
        <div className="bg-white shadow rounded p-4 flex flex-col">
            <img src={product.image} alt={product.title} className="h-40 object-contain mb-3" />
            <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            <div className="mt-auto flex items-center justify-between">
                <span className="font-bold">${product.price}</span>
                <button
                    onClick={() => onAdd(product)}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
