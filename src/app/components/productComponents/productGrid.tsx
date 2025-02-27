"use client"

import { ProductCard } from "./productCard"
import { ProductType } from "@/types/types"

import './productGrid.css'

export const ProductGrid = ({ productList, addToCart }: { productList: ProductType[] | null, addToCart: (target: ProductType) => void }) => {
    if (!productList) {
        return <>
            No Data
        </>
    }


    return <>
        <div className="product-grid">
            {productList.length > 0 ? (productList.map((data, index) => (
                <ProductCard key={index} data={data} addToCart={addToCart} />
            ))) : (<ProductCard data={null} addToCart={addToCart} />)}
        </div>
    </>
}