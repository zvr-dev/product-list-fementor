import { CartItemType, ProductType } from "@/types/types";
import { createStore } from "zustand";

export type CartState = {
    cart: CartItemType[]
}

export type CartActions = {
    addToCart: (newItem: ProductType) => void;
    removeFromCart: (itemToRmv: CartItemType) => void;
    isInCart: (itemToFind: ProductType["name"]) => boolean;
    incrementItem: (item: ProductType["name"]) => void;
    decrementItem: (item: ProductType["name"]) => void;
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
    const {itemExists, updatedCart} = _incrementDecrementHelper(state, newItem.name, "increase")
    
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

// ======== Define isInCart function
// check if item is in the cart
const _isInCart = (state:CartState, itemToFind: ProductType["name"]) : boolean => {
    return Boolean(state.cart.find(cartItem => itemToFind === cartItem.name))
}

type increaseOrDecrease = 'increase' | 'decrease'

const _incrementDecrementHelper = (state: CartState, item:ProductType["name"], type: increaseOrDecrease) => {
    let itemExists= false;
    let updatedCart = state.cart.reduce<CartItemType[]>((accumulator, cartItem) => {
        if (cartItem.name === item) {
            itemExists = true;
            const newAmount = type === 'increase' ? cartItem.amount+1 : cartItem.amount-1
            // skip item if amount is 0
            return newAmount > 0 ? [...accumulator, {...cartItem, amount: (newAmount)}] : accumulator
        } 
        return [...accumulator, cartItem]
    },[])

    return {itemExists, updatedCart}
}
const _increaseOrDecreaseItem = (state: CartState, item:ProductType["name"], type:increaseOrDecrease) => {
    const {updatedCart} = _incrementDecrementHelper(state,item, type);
    return{ cart: updatedCart}
}
export const createCartStore = (
    initState: CartState = defaultCartInitState,
) => {
    return createStore<CartStore>()((set, get) => ({
        ...initState,
        addToCart: newItem => set(state => _addToCart(state, newItem)),
        removeFromCart: (itemToRmv) => set(state => _removeFromCart(state, itemToRmv)),
        isInCart: itemToFind => _isInCart(get(), itemToFind),
        incrementItem: item => set(state => _increaseOrDecreaseItem(state, item, 'increase')),
        decrementItem: item => set(state => _increaseOrDecreaseItem(state, item, 'decrease')),
    }) ,
        
    )}