
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import HeroBanner from '@/components/home/HeroBanner';
import { DemoNotification } from '@/components/notifications/DemoNotification';

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';
  const searchParam = queryParams.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Update state when URL parameters change
  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
  };

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      <DemoNotification />
      {!searchQuery && <HeroBanner />}
      
      <div className="container py-8 md:py-12">
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-2">Search Results for "{searchQuery}"</h2>
            <ProductGrid 
              products={products} 
              category="all"
              searchQuery={searchQuery}
            />
          </div>
        )}
        
        {!searchQuery && (
          <>
            <div className="mb-12 text-center">
              <h1 className="mb-3 text-4xl font-medium">Minimal Design, Maximum Quality</h1>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Beautifully crafted products for your everyday life. Simple, functional, and built to last.
              </p>
            </div>
            
            <section className="mb-16">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Featured Products</h2>
              </div>
              <ProductGrid products={featuredProducts} />
            </section>
            
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Shop All Products</h2>
              </div>
              <ProductFilters onFilterChange={handleFilterChange} activeCategory={activeCategory} />
              <ProductGrid products={products} category={activeCategory} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
