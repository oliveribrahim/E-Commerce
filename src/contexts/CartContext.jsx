import React, {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export function CartProvider({children}) {
    const [purchases, setPurchases] = useState(() => {
        // persist purchases
        const raw = localStorage.getItem("purchases");
        if (!raw) return [];
        
        try {
            const parsed = JSON.parse(raw);
            // Filter out any null, undefined, or invalid items
            return Array.isArray(parsed) 
                ? parsed.filter(item => item && item.id && item.purchaseId)
                : [];
        } catch (error) {
            console.error("Error parsing purchases from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("purchases", JSON.stringify(purchases));
    }, [purchases]);

    function addToPurchases(product) {
        if (!product || !product.id) return; // safety check

        setPurchases(prev => {

            const cleanPrev = prev.filter(item => item && item.id && item.purchaseId);
            const existing = prev.find(item => item?.id === product.id);

            if (existing) {
                return cleanPrev.map(item =>
                    item.id === product.id ? {...item, qty: (item.qty || 0) + 1} : item );
            } else {
                const purchaseItem = {
                    ...product,
                    purchaseId: Date.now(),
                    purchaseDate: new Date().toISOString(),
                    qty: 1
                };
                return [purchaseItem, ...prev];
            }
        });
    }

    function incrementQty(purchaseId) {
        setPurchases(prev => prev.map(
            item => item.purchaseId === purchaseId ? 
            {...item, qty: (item.qty || 0) + 1} : item));
    }

    function decrementQty(purchaseId) {
        setPurchases(prev =>
            prev
                .map(item => {
                    if (item.purchaseId === purchaseId) {
                        const newQty = (item.qty || 0) - 1;
                        if (newQty <= 0) {
                            return null;
                        }
                        return {...item, qty: newQty};
                    }
                    return item;
                })
                .filter(Boolean)
        );
    }
    

    function removeFromPurchases(purchaseId) {
        setPurchases(prev => prev.filter(p => p.purchaseId !== purchaseId));
    }

    function removeAllPurchases(purchaseId) {
        setPurchases([]);
    }
    return (
        <CartContext.Provider value={{
            purchases,
            addToPurchases,
            removeFromPurchases,
            incrementQty,
            decrementQty,
            removeAllPurchases
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
