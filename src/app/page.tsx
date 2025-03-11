"use client"
import { CartComponent } from "@/app/_components/CartComponents/CartComponent";

import "./page.css";

import { CartStoreProvider } from "./_context/cart-store-provider";
import { ProductGrid } from "./_components/ProductComponents/ProductGrid";
import { OrderComponent } from "./_components/OrderComponents/OrderComponent";

export default function Home() {


  return <>
    <main className="page-wrapper">
      <OrderComponent />
      <div className="content-wrapper">
        <CartStoreProvider>
          <section className="lhs">
            <FoodTypeHeading>Desserts</FoodTypeHeading>
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

const FoodTypeHeading = ({ children }: { children: React.ReactNode }) => {
  return <>
    <h1 className="food-type">{children}</h1>
  </>
}