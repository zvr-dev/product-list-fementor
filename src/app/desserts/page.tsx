import { ProductGrid } from "@/app/_components/productComponents/productGrid"
import { ProductType } from "@/types/types"

export default function Page({ productData }: { productData: ProductType[] | null }) {

    return <>
        <h1>
            Desserts
        </h1>
        <ProductGrid productList={productData} />
    </>
}