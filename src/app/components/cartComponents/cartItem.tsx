import Image from 'next/image';
import './cartItem.css';
import CloseIcon from '@/assets/images/icon-remove-item.svg';
import { CartItemType } from '@/types/types';




export const CartItem = ({ data }: { data: CartItemType | null }) => {

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
            <button className="close-btn clr-rose-300 hvr-pulse">
                <CloseIcon />
            </button>
        </div>
    </>

}