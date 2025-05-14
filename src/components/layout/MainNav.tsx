
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';

const MainNav = () => {
  const { user, profile, signOut } = useAuth();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/?category=new"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      New Arrivals
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Check out our latest products and collections
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <CategoryLink href="/?category=tshirts" title="T-Shirts" />
              <CategoryLink href="/?category=shirts" title="Shirts" />
              <CategoryLink href="/?category=jeans" title="Jeans" />
              <CategoryLink href="/?category=bags" title="Bags" />
              <CategoryLink href="/?category=accessories" title="Accessories" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/orders" className={navigationMenuTriggerStyle()}>
            Orders
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {user ? (
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">
                  {profile?.full_name || user.email?.split('@')[0]}
                </span>
              </div>
            </NavigationMenuTrigger>
          ) : (
            <Link to="/sign-in" className={navigationMenuTriggerStyle()}>
              <User size={18} className="mr-2" />
              <span>Sign In</span>
            </Link>
          )}
          
          {user && (
            <NavigationMenuContent>
              <ul className="w-56 p-2">
                <li>
                  <Link 
                    to="/profile" 
                    className="block w-full p-2 hover:bg-accent rounded-md text-sm"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/orders" 
                    className="block w-full p-2 hover:bg-accent rounded-md text-sm"
                  >
                    Orders
                  </Link>
                </li>
                <li className="mt-2 pt-2 border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-2 h-9 text-sm" 
                    onClick={() => signOut()}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Helper component for category links
const CategoryLink = ({ href, title }: { href: string; title: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
      </Link>
    </NavigationMenuLink>
  </li>
);

export default MainNav;
