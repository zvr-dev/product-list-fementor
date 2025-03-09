"use client"
import { CartItem } from './CartItem';
import styles from './CartComponent.module.css'
import Image from 'next/image';
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/app/_context/cart-store-provider';
import { useMemo } from 'react';

export const CartComponent = () => {
    const { cart } = useCartStore(state => state);

    const iconSize = 20;
    function toggleDialog() {
        let dialogElement = document.querySelector('dialog');
        if (dialogElement !== null) {
            dialogElement.open = !dialogElement.open
        }
    }
    let totalPrice: number = (!cart || cart.length === 0) ? 0 :
        cart.reduce((sum, item) => (sum + item.price * item.amount), 0)

    if (!cart || cart.length === 0) {
        const emptyIconSize = 128;
        return <>
            <div className={styles.cart}>
                <h2>Your Cart (0)</h2>
                <div className={styles.cart_empty}>
                    <Image src="/images/illustration-empty-cart.svg"
                        alt=''
                        width={emptyIconSize}
                        height={emptyIconSize} />
                    <p>Your added items will appear here</p>
                </div>
            </div>
        </>
    }



    return <>
        <div className={styles.cart}>
            <h2>Your Cart ({cart.length})</h2>
            <div>
                {cart.map(item => (
                    <CartItem data={item} key={item.name} />
                ))}
            </div>
            <div className={styles.price}>
                <p>Order Total</p>
                <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div className={styles.carbon}>
                {/* <CarbonIcon /> */}
                <Image src={"/images/icon-carbon-neutral.svg"} height={iconSize} width={iconSize} alt='' />
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
            </div>

            <button className={`${styles.btn}`} onClick={toggleDialog}>Confirm Order</button>
        </div>
    </>
}