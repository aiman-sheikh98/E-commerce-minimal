
import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  category?: string;
  searchQuery?: string;
}

const ProductGrid = ({ products, category, searchQuery }: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (category && category !== 'all') {
      result = result.filter((product) => product.category === category);
    }
    
    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((product) => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [products, category, searchQuery]);

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-lg text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
