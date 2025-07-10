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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sidebar)]"></div>
          <p className="text-[var(--color-muted-foreground)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && token) {
    // Redirect to the page they came from or home
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
} 