
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`}
          />
        </button>
      </div>
      <div className="mt-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
