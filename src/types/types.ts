export type ProductType = {
    name: string,
    category: string,
    price: number,
    image: {
        thumbnail: string,
        mobile: string,
        tablet: string,
        desktop: string
    },
}

export type CartItemType = {
    name: string,
    price: number,
    amount: number,
}