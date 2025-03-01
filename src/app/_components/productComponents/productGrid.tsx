"use client"

import { ProductCard } from "./productCard"
import { ProductType } from "@/types/types"
import './productGrid.css'


import productList from '../../data.json';

export const ProductGrid = () => {

    // Fetch products
    if (!productList) {
        return <>
            No Data
        </>
    }


    return <>
        <div className="product-grid">
            {productList.length > 0 ? (productList.map((data, index) => (
                <ProductCard key={index} data={data} />
            ))) : (<ProductCard data={null} />)}
        </div>
    </>
}