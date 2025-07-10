import { create } from 'zustand';
import { api } from '../lib/axios';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';

export interface Company {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  status: UserStatus;
  registration: string;
  updatedAt: string;
  companyId: string;
  company: Company;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  verifyToken: () => Promise<void>;
  logout: () => void;
}

type AuthStore = {
  set: (partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)) => void;
};

export const useAuthStore = create<AuthState>((set: AuthStore['set']) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/register', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  verifyToken: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/verify-token');
      const { user } = response.data;
      set({ user, isLoading: false });
      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
})); 