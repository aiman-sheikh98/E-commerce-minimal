
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-initial">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            MINIMA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium hover:text-primary/80"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 md:hidden">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-medium hover:text-primary/80"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Right navigation items */}
        <div className="flex items-center gap-4">
          <Link to="/search" className="hidden sm:block">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
          </Link>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
