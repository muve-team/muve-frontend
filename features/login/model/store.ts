import { create } from 'zustand';
import { LoginState } from './types';

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));