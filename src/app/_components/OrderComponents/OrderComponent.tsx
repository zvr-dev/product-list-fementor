import Image from 'next/image';
import styles from './OrderComponents.module.css'
import NewOrderButton from './NewOrderButton';
export function OrderComponent({ closeModal }: { closeModal: any }) {
    const iconSize = 48;

    return <div className={styles.wrapper}>
        <Image src={'/images/icon-order-confirmed.svg'} height={iconSize} width={iconSize} alt='' />
        <h1>Order Confirmed</h1>
        <p>We hope you enjoy your food!</p>
        <NewOrderButton closeModal={closeModal} />
    </div>
}