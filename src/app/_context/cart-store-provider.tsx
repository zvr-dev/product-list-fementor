'use client'

import { CartStore, createCartStore } from "@/stores/cart-store"
import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand";

export type CartStoreApi = ReturnType<typeof createCartStore>

// Initialise the store
//      as per zustand docs when integrating with nextjs, use a react context
//      See Providing the store:  https://zustand.docs.pmnd.rs/guides/nextjs
export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export interface CartStoreProviderProps { children: React.ReactNode }

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
    const storeRef = useRef<CartStoreApi>(null)
    if (!storeRef.current) {
        storeRef.current = createCartStore();
    }

    return <CartStoreContext.Provider value={storeRef.current}>
        {children}
    </CartStoreContext.Provider>
}

export const useCartStore = <T,>(selector: (store: CartStore) => T,): T => {
    const cartStoreContext = useContext(CartStoreContext);

    if (!cartStoreContext) {
        throw new Error(`useCartStore must be used within a CartStoreProvider`);
    }

    return useStore(cartStoreContext, selector)
}