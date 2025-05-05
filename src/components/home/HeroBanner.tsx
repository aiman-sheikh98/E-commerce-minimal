
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { products } from '@/data/products';

const HeroBanner = () => {
  const discountedProducts = products.filter((product) => product.featured);
  
  return (
    <div className="relative overflow-hidden">
      <div className="bg-muted py-16 md:py-24">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Special Offers
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Summer Collection <span className="text-primary">30% OFF</span>
              </h1>
              <p className="max-w-lg text-muted-foreground text-lg">
                Discover our curated selection of minimalist designs perfect for your everyday life.
                Quality materials that stand the test of time.
              </p>
              <Link to="/?category=all">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="hidden lg:block">
              <Carousel className="w-full">
                <CarouselContent>
                  {discountedProducts.map((product) => (
                    <CarouselItem key={product.id} className="md:basis-1/1">
                      <Link to={`/product/${product.id}`} className="block group relative overflow-hidden rounded-lg">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            30% OFF
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                              <span className="font-medium">${(product.price * 0.7).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
