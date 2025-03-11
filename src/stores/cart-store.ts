import { CartItem } from "@/app/_components/CartComponents/CartItem";
import { CartItemType, ProductType } from "@/types/types";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// TODO: Reimplement cart as hash table because we dont have product ids
// Add total to cart state

export type CartState = {
    cart: CartItemType[]
}

export type CartActions = {
    getTotalPrice : () => number;
    getItemFromCart: (itemToFind: ProductType["name"]) => CartItemType | undefined;
    isInCart: (itemToFind: ProductType["name"]) => boolean;
    addToCart: (newItem: ProductType) => void;
    removeFromCart: (itemToRmv: CartItemType) => void;
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

const _incrementDecrementHelper = (state: CartState, itemName:ProductType["name"], type: increaseOrDecrease) => {
    let itemExists= false;
    let updatedCart = state.cart.map((cartItem) => {
        if (cartItem.name === itemName) {
            itemExists = true;
            const newAmount = type === 'increase' ? cartItem.amount+1 : cartItem.amount-1
            // skip item if amount is 0
            return newAmount > 0 ? {...cartItem, amount: (newAmount)} : null;
        } 
        return cartItem;
    })
    .filter(Boolean) as CartItemType[]; // filter out null items
    return {itemExists, updatedCart}
}
const _increaseOrDecreaseItem = (state: CartState, item:ProductType["name"], type:increaseOrDecrease) => {
    const {updatedCart} = _incrementDecrementHelper(state,item, type);
    return{ cart: updatedCart}
}

const _getItemFromCart = (cart: CartItemType[],itemToFind : ProductType["name"]) => {
    return cart.find(cartItem => cartItem.name === itemToFind);
}

const _calculateTotalPrice = (cart: CartItemType[]) => {
    return cart.reduce(
        (total, cartItem) => (total + cartItem.amount * cartItem.price), 0)
}

export const createCartStore = (
    initState: CartState = defaultCartInitState,
) => {
    return createStore<CartStore>()( 
        persist(
            (set, get) => ({
                ...initState,
                getTotalPrice: () => _calculateTotalPrice(get().cart),
                getItemFromCart: (itemToFind: ProductType["name"]) => _getItemFromCart(get().cart, itemToFind),
                addToCart: newItem => set(state => _addToCart(state, newItem)),
                removeFromCart: (itemToRmv) => set(state => _removeFromCart(state, itemToRmv)),
                isInCart: itemToFind => _isInCart(get(), itemToFind),
                incrementItem: item => set(state => _increaseOrDecreaseItem(state, item, 'increase')),
                decrementItem: item => set(state => _increaseOrDecreaseItem(state, item, 'decrease')),
            }) ,
            {
                name: 'cart-storage', // name of the item in the storage (must be unique)
            },
        ),
    )
}