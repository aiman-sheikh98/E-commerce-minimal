
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const WishlistPanel = () => {
  const { wishlist, removeFromWishlist, totalItems } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePanel}
        aria-label={`Wishlist${totalItems > 0 ? ` (${totalItems} items)` : ''}`}
      >
        {isOpen ? (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 w-80 right-0 top-12 rounded-md border shadow-md">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Wishlist</h3>
                <Button variant="ghost" size="sm" onClick={togglePanel}>
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-80">
              {wishlist.length > 0 ? (
                <div className="p-4 space-y-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="font-medium hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-destructive"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Your wishlist is empty
                </div>
              )}
            </ScrollArea>
          </div>
        ) : null}
      </Button>
    </div>
  );
};

export default WishlistPanel;
