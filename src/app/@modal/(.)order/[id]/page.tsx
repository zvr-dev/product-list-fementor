"use client"
import { OrderComponent } from "@/app/_components/OrderComponents/OrderComponent";
import styles from './page.module.css'
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function OrderModal() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    // Add esc event listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                router.push('/', { scroll: false })
            }
        }
        document.addEventListener("keydown", handleKeyDown)

        // Clean up event listener on component unmount
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [])

    // Open modal if on /orders/
    useEffect(() => {
        const targetPath = "/order/";
        if (pathname.startsWith(targetPath)) {
            setIsOpen(true);
        }
    }, [pathname])

    // Force users tab focus to the modal
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen])

    const closeModal = () => {
        router.push('/', {});
        router.refresh();
        setIsOpen(false);
    }

    return isOpen ?
        <div className={styles.modal_container} onClick={closeModal}>
            <div id="modal"
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                ref={modalRef}
                tabIndex={-1}       // makes the div focusable but prevents being apart of tab order
            >
                <OrderComponent closeModal={closeModal} />
            </div>
        </div>
        : null;
}

