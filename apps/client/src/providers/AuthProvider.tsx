import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { api } from '../lib/axios';
import { useToast } from '@saas-app/ui';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, isLoading: storeLoading, verifyToken } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial auth check
    const checkAuth = async () => {
      try {
        if (token) {
          // Verify token with backend
          await verifyToken();
        }
      } catch (error: any) {
        // If token is invalid, clear it and show error
        useAuthStore.getState().logout();
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: error.response?.data?.error || 'Session expired. Please login again.',
        });
      } finally {
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, [token, toast, verifyToken]);

  useEffect(() => {
    // Set up axios interceptor for auth token
    const interceptor = api.interceptors.request.use((config) => {
      const currentToken = useAuthStore.getState().token;
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    });

    // Set up response interceptor to handle 401 errors
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: error.response?.data?.error || 'Session expired. Please login again.',
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(interceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [toast]);

  const value = {
    isLoading: storeLoading,
    isAuthenticated: !!token,
    isInitialized,
  };

  // Only render children after initialization
  if (!isInitialized) {
    // You could return a loading spinner here
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 