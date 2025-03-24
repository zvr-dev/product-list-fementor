"use client"
import Image from "next/image"
import { CartItemType, ProductType } from "@/types/types"
import { useCartStore } from "@/app/_context/cart-store-provider"
import DecrementSvg from '@/assets/images/icon-decrement-quantity.svg'
import IncrementSvg from '@/assets/images/icon-increment-quantity.svg'
import AddToCartSvg from '@/assets/images/icon-add-to-cart.svg'
import './ProductCard.css'
import useHasMounted from "@/hooks/useHasMounted"

export const ProductCard = ({ product }: { product: ProductType }) => {
    const hasMounted = useHasMounted();
    const cartItem = useCartStore(state => state.getItemFromCart(product.name))
    const isInCart = Boolean(cartItem);

    if (!hasMounted) return null;
    return (
        <div className="product-card">
            <div className="product-top">

                <img src={product.image.desktop} className={isInCart ?
                    'img-in-cart' : ''} alt=""
                    suppressHydrationWarning />
                <AddToCartButton product={product} cartItem={cartItem} />
            </div>
            <small>{product.category}</small>
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
        </div>
    )
};

const AddToCartButton = ({ product, cartItem }: { product: ProductType, cartItem: CartItemType | undefined }) => {
    const { addToCart, incrementItem, decrementItem } = useCartStore(state => state);
    const iconSize = 22;

    return <>
        <button onClick={() => addToCart(product)}
            className={`hvr-pulse btn btn-add-to-cart ${cartItem ? "hidden" : ""}`} >
            {/* <Image src={"/images/icon-add-to-cart.svg"} width={iconSize} height={iconSize} alt="" /> */}
            <AddToCartSvg />
            Add to Cart
        </button>

        <div className={`btn in-cart ${cartItem ? "" : "hidden"}`}>
            <button onClick={() => decrementItem(product.name)}>
                <DecrementSvg />
            </button>
            <span>{cartItem?.amount || 0}</span>
            <button onClick={() => incrementItem(product.name)}>
                <IncrementSvg />
            </button>
        </div>
    </>



}