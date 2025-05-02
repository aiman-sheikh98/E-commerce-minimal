
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  onFilterChange: (category: string) => void;
  activeCategory: string;
}

const ProductFilters = ({
  onFilterChange,
  activeCategory,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-8">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="outline"
          onClick={() => onFilterChange(category.value)}
          className={cn(
            "border-muted bg-background hover:bg-secondary",
            activeCategory === category.value &&
              "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default ProductFilters;
