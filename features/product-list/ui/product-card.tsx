// features/product-list/ui/product-card.tsx
import { Product } from '@/entities/product/types';
import { Card, CardContent } from '@/components/ui/merged/Card';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-primary font-bold">
          {new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
          }).format(product.price)}
        </p>
      </CardContent>
    </Card>
  );
};
