import { z } from 'zod';
import { loginSchema } from './schema';
import { User } from '@/entities/login/types';

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}