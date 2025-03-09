"use client"
import Image from "next/image"
import { ProductType } from "@/types/types"
import { useCartStore } from "@/app/_context/cart-store-provider"
import DecrementSvg from '@/assets/images/icon-decrement-quantity.svg'
import IncrementSvg from '@/assets/images/icon-increment-quantity.svg'
import './ProductCard.css'
import { useState } from "react"

export const ProductCard = ({ product }: { product: ProductType | null }) => {
    const { isInCart } = useCartStore(state => state)
    if (!product) {
        return <div className="">No product data :(</div>
    }

    return (
        <div className="product-card">
            <div className="product-top">

                <img src={product.image.desktop} className={`${isInCart(product.name) ? 'img-in-cart' : ''} `} alt="" />
                <AddToCartButton product={product} />
            </div>

            <small>{product.category}</small>
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
        </div>
    )
}

const AddToCartButton = ({ product }: { product: ProductType }) => {
    const { addToCart, isInCart, incrementItem, decrementItem, cart } = useCartStore(state => state)
    const iconSize = 22;

    if (!isInCart(product.name)) {
        return <button onClick={() => addToCart(product)}
            className="hvr-pulse btn btn-add-to-cart">
            <Image src={'/images/icon-add-to-cart.svg'} width={iconSize} height={iconSize} alt="" />
            Add to Cart
        </button>
    }


    return <div className="btn in-cart">
        <button className="" onClick={() => decrementItem(product.name)}><DecrementSvg /></button>
        <span>{cart.find(itemToFind => itemToFind.name === product.name)?.amount}</span>
        <button className="" onClick={() => incrementItem(product.name)}><IncrementSvg /></button>
    </div>



}