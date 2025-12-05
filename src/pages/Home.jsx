import React from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const nav = useNavigate();

    return (
        <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome on my Store</h2>
            <p className="text-gray-600 mb-6">Choose to go to the product list or view your previous purchases</p>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => nav("/products")}
                    className="px-6 py-3 bg-green-600 text-white rounded">
                    Browse Products
                </button>

                <button
                    onClick={() => nav("/purchases")}
                    className="px-6 py-3 border border-gray-300 rounded">
                    purchases
                </button>
            </div>
        </div>
    );
}
