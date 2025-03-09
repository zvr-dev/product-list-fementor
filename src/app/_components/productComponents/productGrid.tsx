"use client"

import './ProductGrid.css'


import productList from '../../data.json';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {

    // Fetch products
    if (!productList) {
        return <>
            No Data
        </>
    }


    return <>
        <div className="product-grid">
            {productList.length > 0 ? (productList.map(productData => (
                <ProductCard key={productData.name} product={productData} />
            ))) : (<ProductCard product={null} />)}
        </div>
    </>
}