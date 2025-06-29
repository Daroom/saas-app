// import type { User } from '../stores/useAuthStore';
import type { AuthState } from '../stores/useAuthStore';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '@saas-app/ui';

export function useAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const myAuthStore: AuthState = useAuthStore();
  const { user, token, isLoading, login, register, logout: storeLogout } = myAuthStore;
  
  if(user){
    console.log({user})
  }else{
    console.log('no user')
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      navigate('/');
    } catch (error) {
      console.log({error});
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid credentials',
      });
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      await register(email, password, name);
      toast({
        title: 'Success',
        description: 'Registered successfully',
      });
      navigate('/');
    } catch (error) {
      console.log({error});
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Registration failed',
      });
    }
  };

  const logout = () => {
    storeLogout();
    navigate('/login');
  };

  return {
    user,
    token,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout,
    isAuthenticated: !!token,
  };
} 