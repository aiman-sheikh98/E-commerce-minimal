
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Reset image index when product changes
    setCurrentImageIndex(0);
  }, [id]);

  if (!product) {
    navigate('/');
    return null;
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // When color changes, switch to the first image
    // In a real app, you might have color-specific images
    setCurrentImageIndex(0);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square bg-secondary">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square bg-secondary cursor-pointer border-2 ${idx === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => selectImage(idx)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">{product.name}</h1>
            <p className="text-xl">${product.price}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Color</h3>
              <RadioGroup
                value={selectedColor}
                onValueChange={handleColorChange}
                className="flex flex-wrap gap-2"
              >
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex cursor-pointer items-center justify-center rounded-full border p-1 peer-data-[state=checked]:border-primary"
                    >
                      <span
                        className="h-6 w-6 rounded-full"
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
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {product.sizes.length > 1 && (
              <div className="space-y-2">
                <h3 className="font-medium">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-9 w-16 cursor-pointer items-center justify-center rounded-md border bg-background text-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex w-full max-w-[8rem] items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <div className="flex h-9 w-full items-center justify-center border-y bg-background">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="rounded-l-none"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          <Button className="w-full" size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          
          <Separator />
          
          <div className="prose prose-sm max-w-none">
            <h3 className="font-medium">Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
