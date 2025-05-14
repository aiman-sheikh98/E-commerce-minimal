
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface NewArrivalsSectionProps {
  products: Product[];
}

const NewArrivalsSection = ({ products }: NewArrivalsSectionProps) => {
  // Take just the first 4 products
  const displayProducts = products.slice(0, 4);
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium">New Arrivals</h2>
          <Link to="/?category=new-arrivals" className="text-sm font-medium text-primary flex items-center hover:underline">
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {displayProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              className="group block"
            >
              <div className="aspect-square overflow-hidden rounded-md bg-muted mb-3 relative">
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  New
                </div>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/?category=new-arrivals">
              Shop All New Arrivals
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
