import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';
import { useAuthStore } from '../../stores/useAuthStore';

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);

  if (isLoading) {
    // You could return a loading spinner here
    return null;
  }

  if (isAuthenticated && token) {
    // Redirect to the page they came from or home
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
} 