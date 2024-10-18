import { ProductDetail } from "@/components/product-detail"
import { allProducts, getProductById } from "@/lib/products"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(parseInt(params.id))

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}