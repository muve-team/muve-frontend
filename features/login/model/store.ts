// features/session/model/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Login, User } from '@/entities/login/types';
import { useLogout } from './queries';

interface LoginState extends Login {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setLogin: (token: string, user: User) => void;
  clearLogin: () => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setLogin: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      clearLogin: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({ user: state.user }), // 유저 정보만 localStorage에 저장
    }
  )
);
