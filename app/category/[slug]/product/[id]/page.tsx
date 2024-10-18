import { ProductDetail } from "@/components/product-detail"
import { allProducts, getProductById } from "@/lib/products"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.category,
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: { params: { slug: string, id: string } }) {
  const product = getProductById(parseInt(params.id))

  if (!product || product.category !== params.slug) {
    notFound()
  }

  return <ProductDetail product={product} />
}