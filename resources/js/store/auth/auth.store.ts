import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './auth.types';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
