
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the user is not logged in and we're not loading, redirect to sign in
    if (!isLoading && !user) {
      // Encode the current path to return to after login
      const returnPath = encodeURIComponent(location.pathname + location.search);
      navigate(`/sign-in?redirect=${returnPath}`);
    }
  }, [user, isLoading, navigate, location]);

  // Show nothing while we're checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated, render children
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
