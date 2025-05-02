
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">MINIMA</h3>
            <p className="text-sm text-muted-foreground">
              Simple, beautiful, functional products for everyday life.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-muted-foreground hover:text-foreground">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-muted-foreground hover:text-foreground">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MINIMA. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
