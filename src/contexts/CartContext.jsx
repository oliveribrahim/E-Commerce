import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [purchases, setPurchases] = useState(() => {
        // persist purchases
        const raw = localStorage.getItem("purchases");
        return raw ? JSON.parse(raw) : [];
    });

    useEffect(() => {
        localStorage.setItem("purchases", JSON.stringify(purchases));
    }, [purchases]);

    function addToCart(product) {
        setCart(prev => {
            const found = prev.find(p => p.id === product.id);
            if (found) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    }

    function removeFromCart(productId) {
        setCart(prev => prev.filter(p => p.id !== productId));
    }

    function clearCart() {
        setCart([]);
    }

    function checkout() {
        if (cart.length === 0) return;
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: cart.reduce((s, it) => s + it.price * it.qty, 0),
        };
        setPurchases(prev => [order, ...prev]);
        clearCart();
        return order;
    }

    return (
        <CartContext.Provider value={{
            cart,
            purchases,
            addToCart,
            removeFromCart,
            clearCart,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
