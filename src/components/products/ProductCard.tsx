
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block overflow-hidden product-card",
        className
      )}
    >
      <div className="product-image-container bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">${product.price}</p>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border"
                style={{
                  backgroundColor:
                    color === "White"
                      ? "#fff"
                      : color === "Black"
                      ? "#000"
                      : color === "Gray"
                      ? "#888"
                      : color === "Natural"
                      ? "#f4efe7"
                      : color === "Sage"
                      ? "#cdd6cd"
                      : color === "Cream"
                      ? "#f9f5e9"
                      : color === "Charcoal"
                      ? "#36454f"
                      : color === "Tan"
                      ? "#d2b48c"
                      : color === "Brown"
                      ? "#964b00"
                      : color === "Terracotta"
                      ? "#e2725b"
                      : "#ddd"
                }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
