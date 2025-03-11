"use client"
import Image from 'next/image';
import styles from './OrderComponents.module.css'
export function OrderComponent({ }) {
    const iconSize = 48;

    return <dialog className={styles.modal} id="modal">
        <div className={styles.wrapper}>
            <Image src={'/images/icon-order-confirmed.svg'} height={iconSize} width={iconSize} alt='' />
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
            <button className={styles.btn} onClick={() => {
                const modal: HTMLDialogElement | null = document.querySelector("dialog");
                if (modal !== null) modal.close();

            }}>Start New Order</button>
        </div>
    </dialog>
}