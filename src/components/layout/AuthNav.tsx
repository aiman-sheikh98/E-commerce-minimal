
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRound, LogOut, Package, Settings } from 'lucide-react';

const AuthNav = () => {
  const { user, profile, signOut } = useAuth();

  if (!user) {
    return (
      <Link to="/sign-in">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full bg-accent/20 hover:bg-accent/40">
          {profile?.avatar_url ? (
            <Avatar className="h-8 w-8 border-2 border-primary/10">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name || user.email} />
              <AvatarFallback className="bg-primary/90 text-primary-foreground">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <UserRound size={18} />
              <span className="hidden md:inline-block">
                {profile?.full_name || 'Account'}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {profile?.full_name || 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center gap-2">
            <Settings size={16} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="cursor-pointer flex items-center gap-2">
            <Package size={16} />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="cursor-pointer flex items-center gap-2"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
