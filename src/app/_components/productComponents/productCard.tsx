"use client"
import Image from "next/image"
import { CartItemType, ProductType } from "@/types/types"
import { useCartStore } from "@/app/_context/cart-store-provider"
import DecrementSvg from '@/assets/images/icon-decrement-quantity.svg'
import IncrementSvg from '@/assets/images/icon-increment-quantity.svg'
import './ProductCard.css'
import { useEffect, useState } from "react"

export const ProductCard = ({ product }: { product: ProductType }) => {
    const [isClientLoading, setIsClientLoading] = useState(true);
    // To prevent hydration issues
    useEffect(() => {
        setIsClientLoading(false)
    }, [])

    const cartItem = useCartStore(state => state.getItemFromCart(product.name))
    const inCartFlag = Boolean(cartItem);

    return (
        <div className="product-card">
            <div className="product-top">
                <img src={product.image.desktop} className={!isClientLoading && inCartFlag ? 'img-in-cart' : ''} alt="" />
                <AddToCartButton product={product} cartItem={cartItem} />
            </div>
            <small>{product.category}</small>
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
        </div>
    )
};

const AddToCartButton = ({ product, cartItem }: { product: ProductType, cartItem: CartItemType | undefined }) => {
    const [isClientLoading, setIsClientLoading] = useState(true);

    useEffect(() => {
        setIsClientLoading(false)
    }, [])

    const { addToCart, incrementItem, decrementItem } = useCartStore(state => state);
    const iconSize = 22;

    if (!cartItem || isClientLoading) {
        return <button onClick={() => addToCart(product)}
            className="hvr-pulse btn btn-add-to-cart">
            <Image src={'/images/icon-add-to-cart.svg'} width={iconSize} height={iconSize} alt="" />
            Add to Cart
        </button>
    }

    return <div className="btn in-cart">
        <button onClick={() => decrementItem(product.name)}><DecrementSvg /></button>
        <span>{cartItem ? cartItem.amount : 0}</span>
        <button onClick={() => incrementItem(product.name)}><IncrementSvg /></button>
    </div>



}