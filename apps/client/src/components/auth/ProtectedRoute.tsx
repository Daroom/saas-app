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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sidebar)]"></div>
          <p className="text-[var(--color-muted-foreground)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 