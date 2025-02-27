"use client"
import { useState } from "react";
import { CartComponent } from "@/app/components/cartComponents/cartComponent";
import { ProductGrid } from "@/app/components/productComponents/productGrid";
import { CartItemType, ProductType } from "@/types/types";
import "./page.css";
import productData from './data.json';

export default function Home() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (target: ProductType) => {
    setCart(prevCart => {
      const foundIndex = prevCart.findIndex(cartItem => cartItem.name === target.name)

      // If item in cart, amt++
      if (foundIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[foundIndex] = {
          ...updatedCart[foundIndex],
          amount: updatedCart[foundIndex].amount + 1
        }
        return updatedCart;
      }

      // Add new item
      const cartItem: CartItemType = {
        name: target.name,
        price: target.price,
        amount: 1
      }

      return [...prevCart, cartItem]
    })
  }

  return <>
    <main className="page-wrapper">

      <div className="content-wrapper">
        <section className="lhs">
          <h1>Desserts</h1>
          <ProductGrid productList={productData} addToCart={addToCart} />
        </section>
        <section className="rhs">
          <CartComponent cartData={cart} />
        </section>
      </div>
    </main>
  </>
}
