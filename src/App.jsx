import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";
import { CartProvider, useCart } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";
import SearchBar from "./components/SearchBar";
import logo from './assets/logo.jpg';

function Header() {

    const { purchases } = useCart();    
    const totalPurchases = purchases.reduce((sum, item) => sum + (item.qty || 1), 0 );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-20 h-20 rounded-full cursor-pointer"/>
                    </Link>
                </div>
                <div className="flex items-center gap-3 bg-blue-100 rounded-lg p-4">Number of Purchases : <span className="font-extrabold text-2xl text-blue-600">{totalPurchases}</span></div>
                <div className="flex-1 max-w-xl mx-4">
                    <SearchBar />
                </div>
                <nav className="flex space-x-4">
                    <Link to="/" className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors hover:bg-blue-100 rounded-lg p-2">Home</Link>
                    <Link to="/products" className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors hover:bg-blue-100 rounded-lg p-2">Products</Link>
                    <Link to="/purchases" className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors hover:bg-blue-100 rounded-lg p-2">My Purchases</Link>
                </nav>
            </div>
        </header>
    );
}   

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <SearchProvider>
                <CartProvider>
                    <Header />
                    <main className="container mx-auto px-4 py-16 mt-20">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/purchases" element={<Purchases />} />
                            <Route path="*" element={<div>404 - Not Found</div>} />
                        </Routes>
                    </main>
                </CartProvider>
            </SearchProvider>
        </div>
    );
}
