// import type { User } from '../stores/useAuthStore';
import type { AuthState, User } from '../stores/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '@saas-app/ui';
import { useAuthContext } from '../providers/AuthProvider';

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isInitialized } = useAuthContext();
  const { user, token, isLoading, login, register, verifyToken, logout: storeLogout } = useAuthStore();
  
  // if(user){
  //   console.log({user})
  // }else{
  //   console.log('no user')
  //   navigate('/login');
  // }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      // Navigate to the page they came from or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.error || 'Invalid credentials',
      });
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      toast({
        title: 'Success',
        description: 'Registered successfully',
      });
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred on registration',
      });
    }
  };

  const handleVerifyToken = async () => {
    try {
      const user = await verifyToken();
      return user;
    } catch (error: any) {
      console.error('Token verification error:', error);
      throw error;
    }
  };

  const logout = () => {
    storeLogout();
    toast({
      title: 'Success',
      description: 'Logged out successfully',
    });
    navigate('/login', { replace: true });
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isInitialized,
    login: handleLogin,
    register: handleRegister,
    verifyToken: handleVerifyToken,
    logout,
    // Helper getters
    isActive: user?.status === 'ACTIVE',
    companyName: user?.company?.name || '',
    companyId: user?.companyId || '',
  };
} 