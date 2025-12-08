import React from "react";
import { useCart } from "../contexts/CartContext";

export default function Purchases() {
    const { purchases, removeFromPurchases, incrementQty, decrementQty, removeAllPurchases } = useCart();

    if (!purchases || purchases.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Purchases Yet</h2>
                <p className="text-gray-500">Add products to your purchases from the Products page.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Purchases</h2>
            <h1 className="text-gray-500 mb-2 text-2xl font-bold bg-blue-500 text-white p-4 rounded-lg mx-auto w-fit">
                Total Purchases: ${purchases.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</h1>
            <button className="bg-blue-500 text-white p-4 mb-4 mx-auto block rounded-lg font-extrabold transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800">Checkout</button>
            <button onClick={() => removeAllPurchases()} className="bg-red-500 text-white p-4 mb-4 mx-auto block rounded-lg font-extrabold transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800">Remove All</button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((item) => (
                    <div
                        key={item.purchaseId}
                        className="bg-white rounded-xl shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="mb-4 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-contain rounded-lg"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                            {item.title}
                        </h3>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl font-bold text-blue-600">
                                    ${(item.price * item.qty).toFixed(2)}
                                </span>

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => item.qty > 1 && decrementQty(item.purchaseId)}
                                        className={`px-4 py-2 rounded-lg font-extrabold transition-all duration-200
    ${item.qty <= 1
                                                ? "bg-blue-300 text-white cursor-not-allowed hover:bg-blue-400"
                                                : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                                        -
                                    </button>

                                    <span className="text-2xl font-bold text-blue-600 mx-4">
                                        {item.qty || 1}
                                    </span>

                                    <button
                                        onClick={() => incrementQty(item.purchaseId)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-extrabold transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800">
                                        +
                                    </button>
                                </div>


                                <span className="text-sm text-gray-500">
                                    {new Date(item.purchaseDate).toLocaleDateString()}
                                </span>
                            </div>
                            <button
                                onClick={() => removeFromPurchases(item.purchaseId)}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
