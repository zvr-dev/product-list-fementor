"use client"
import { CartComponent } from "@/app/_components/cartComponents/cartComponent";
import { ProductGrid } from "@/app/_components/productComponents/productGrid";

import "./page.css";

import { CartStoreProvider } from "./_context/cart-store-provider";

export default function Home() {


  return <>
    <main className="page-wrapper">

      <div className="content-wrapper">
        <CartStoreProvider>
          <section className="lhs">
            <h1>Desserts</h1>
            <ProductGrid />
          </section>
          <section className="rhs">
            <CartComponent />
          </section>
        </CartStoreProvider>
      </div>
    </main>
  </>
}
