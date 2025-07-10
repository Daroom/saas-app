import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';
import { useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Double-check token presence
    if (!token) {
      useAuthStore.getState().logout();
    }
  }, [token]);

  if (isLoading) {
    // You could return a loading spinner here
    return null;
  }

  if (!isAuthenticated || !token) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 