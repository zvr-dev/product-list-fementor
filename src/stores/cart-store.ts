import { CartItemType, ProductType } from "@/types/types";
import { createStore } from "zustand";

export type CartState = {
    cart: CartItemType[]
}

export type CartActions = {
    addToCart: (newItem: ProductType) => void;
    removeFromCart: (itemToRmv: CartItemType) => void;
}

export type CartStore = CartState & CartActions

export const defaultCartInitState : CartState = {
    cart: []
}

// ========= Define add to cart function
//  return a cart object, 
//  if the item was found then map over the cart and increment found items amt by 1
//              if it wasnt found then spread old cart and add new item
const _addToCart = (state: CartState, newItem:ProductType) => {
    let itemExists = false;
    let updatedCart = state.cart.reduce<CartItemType[]>((accumulator, item) => {
        if (item.name === newItem.name) {
            itemExists = true;
            return [...accumulator, {...item, amount: item.amount+1}] 
        } 
        return [...accumulator, item]
    },[])
    
    return {
        cart : itemExists ? updatedCart : [...updatedCart, {
            name: newItem.name,
            price: newItem.price,
            amount: 1
        }]
    }
}

//  ======== Define remove from cart function
// return a cart object  
//  array.filter out the item to remove
const _removeFromCart = (state:CartState, itemToRmv:CartItemType) => ({
    cart: state.cart.filter(item => item.name !== itemToRmv.name)
})

export const createCartStore = (
    initState: CartState = defaultCartInitState,
) => {
    return createStore<CartStore>()((set) => ({
        ...initState,
        addToCart: newItem => set(state => _addToCart(state, newItem)),
        removeFromCart: (itemToRmv) => set(state => _removeFromCart(state, itemToRmv))
        }) ,
    )}