"use client"
import Image from "next/image"
import { ProductType } from "@/types/types"
import { useCartStore } from "@/app/_context/cart-store-provider"
import './productCard.css'

export const ProductCard = ({ data }: { data: ProductType | null }) => {
    const { addToCart } = useCartStore(state => state)
    if (!data) {
        return <div className="">No Data :(</div>
    }
    const iconSize = 22;
    return (
        <article className="product-card">
            <img src={data.image.desktop} alt="" />
            <button onClick={() => addToCart(data)} className="hvr-pulse"><Image src={'/images/icon-add-to-cart.svg'} width={iconSize} height={iconSize} alt="" />Add to Cart</button>
            <small>{data.category}</small>
            <h4>{data.name}</h4>
            <p>${data.price.toFixed(2)}</p>
        </article>
    )
}