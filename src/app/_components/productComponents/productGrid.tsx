"use client"

import './ProductGrid.css'


import productList from '../../data.json';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {

    // Fetch products
    if (!productList || productList == null) {
        return <>
            No Data
        </>
    }


    return <>
        <div className="product-grid">
            {(productList.map(productData => (
                <ProductCard key={productData.name} product={productData} />
            )))}
        </div>
    </>
}