import Image from 'next/image';
import './cartItem.css';
import CloseIcon from '@/assets/images/icon-remove-item.svg';
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/app/_context/cart-store-provider';


export const CartItem = ({ data }: { data: CartItemType | null }) => {
    const { removeFromCart } = useCartStore(state => state)
    if (!data) {
        return <>Somethings wrong, no item data</>
    }
    const btnSize = 12;
    return <>
        <div className="cart-item">
            <div className="left">
                <div className="item-details ">
                    <span className='fw-bold'>{data.name}</span>
                    <div className='fw-bold clr-rose-500'>
                        <span className='clr-red'>
                            {data.amount}x
                        </span>
                        <span className='fw-normal'>
                            <small>@</small>
                            ${data.price.toFixed(2)}
                        </span>
                        <span> ${(data.amount * data.price).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button className="close-btn clr-rose-300 hvr-pulse" onClick={() => removeFromCart(data)}>
                <CloseIcon />
            </button>
        </div>
    </>

}