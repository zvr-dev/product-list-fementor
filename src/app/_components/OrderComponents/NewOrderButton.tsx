"use client"
import React from 'react';
import styles from './OrderComponents.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function NewOrderButton({ closeModal }: { closeModal: any | null }) {

    return <>
        <Link href={'/'} onClick={closeModal} className={styles.btn} passHref>
            Start New Order
        </Link>
    </>

}
// https://stackoverflow.com/questions/74166577/dynamic-modal-routing-with-nextjs-like-instagram