
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Bell, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useNotifications } from '@/context/NotificationContext';
import { useWishlist } from '@/context/WishlistContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import WishlistPanel from '@/components/wishlist/WishlistPanel';
import MainNav from './MainNav';
import AuthNav from './AuthNav';

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { unreadCount } = useNotifications();
  const { totalItems: wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

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
        <div className="hidden md:block">
          <MainNav />
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 md:hidden">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit">Search</Button>
                </div>
              </form>
              <Link
                to="/"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/?category=tshirts"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                T-Shirts
              </Link>
              <Link
                to="/?category=shirts"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Shirts
              </Link>
              <Link
                to="/?category=jeans"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Jeans
              </Link>
              <Link
                to="/?category=bags"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Bags
              </Link>
              <Link
                to="/?category=accessories"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Accessories
              </Link>
              <Link
                to="/orders"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Orders
              </Link>
              <Link
                to="/profile"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <Link
                to="/sign-in"
                className="text-base font-medium"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Right navigation items */}
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost">
                  <Search size={20} />
                </Button>
              </form>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <NotificationPanel />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Heart size={20} />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlistItems}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <WishlistPanel />
            </PopoverContent>
          </Popover>

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
    </header>
  );
};

export default Navbar;
