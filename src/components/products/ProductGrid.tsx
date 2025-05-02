
import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  category?: string;
}

const ProductGrid = ({ products, category }: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category && category !== 'all') {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, category]);

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
