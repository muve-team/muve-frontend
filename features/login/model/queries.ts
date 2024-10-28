import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/entities/login/api';
import type { LoginFormData } from './types';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: LoginFormData) => loginApi.login(credentials),
  });
};