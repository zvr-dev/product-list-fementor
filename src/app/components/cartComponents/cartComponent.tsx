"use client"
import { CartItem } from './cartItem';
import styles from './cartComponent.module.css'
import Image from 'next/image';
import { CartItemType } from '@/types/types';

export const CartComponent = ({ cartData }: { cartData: CartItemType[] | null }) => {
    if (!cartData || cartData.length == 0) {
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

    const iconSize = 20;

    let totalPrice: number = 0;
    cartData.map(cartItem => {
        totalPrice += cartItem.price * cartItem.amount
    })


    return <>
        <div className={styles.cart}>
            <h2>Your Cart ({cartData.length})</h2>
            <div className="cart-contents">

                {cartData.map((item, index) => (
                    <CartItem data={item} key={index} />
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

            <button className={`${styles.btn} hvr-pulse`}>Confirm Order</button>
        </div>
    </>
}