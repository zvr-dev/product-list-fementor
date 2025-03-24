"use client"
import { CartItem } from './CartItem';
import styles from './CartComponent.module.css'
import Image from 'next/image';
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/app/_context/cart-store-provider';
import { useMemo } from 'react';
import CarbonNeutralSvg from '@/assets/images/icon-carbon-neutral.svg'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useHasMounted from '@/hooks/useHasMounted';

export const CartComponent = () => {
    const { cart, getTotalPrice } = useCartStore(state => state);
    const totalPrice = useMemo(() => getTotalPrice(), [cart]);
    const router = useRouter();
    const hasMounted = useHasMounted();
    const iconSize = 20;

    function handleConfirmOrder() {

    }

    if (!hasMounted) return null;

    if (!cart || cart.length === 0) {
        const emptyIconSize = 128;
        return <>
            <div className={styles.cart}>
                <h2>Your Cart (0)</h2>
                <div className={styles.cart_empty}>
                    <Image src="/images/illustration-empty-cart.svg"
                        alt=''
                        width={emptyIconSize}
                        height={emptyIconSize}
                        priority />
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
                <CarbonNeutralSvg />
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
            </div>
            <Link href={`/order/123`} scroll={false}>
                <button className={styles.btn} onClick={handleConfirmOrder}>Confirm Order</button>
            </Link>
        </div>
    </>
}