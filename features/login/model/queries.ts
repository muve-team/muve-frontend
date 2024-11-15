// features/login/model/queries.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/features/login/model/store';
import { api } from '@/shared/lib/axios-instance';
import type { LoginCredentials, LoginApiResponse, LoginResponse } from '@/entities/login/types';
import { CommonResponse } from '@/shared/types/types';
import { AxiosResponse } from 'axios';
import { LoginFormData } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schema';
import { loginApi } from '@/entities/login/api'


export const useLoginMutation = () => {
  const router = useRouter();
  const setLogin = useLoginStore((state) => state.setLogin);

  const {
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await loginApi.login(credentials); 
      const data = response.data;

      if (!data) {
        setError('root', {
          type: 'manual',
          message: response.message,
        });
        throw new Error(response.message);
      }

      setLogin(data.token, data.user);
      return response;
    },
    onSuccess: () => {
      router.push('/');
    }
  });
};

export const useValidateToken = () => {
  const { setLogin, clearLogin } = useLoginStore();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['validateToken'],
    queryFn: async () => {
      try {
        const { data } = await loginApi.validateToken();

        if (!data) {
          throw new Error("토큰 검증에 실패하였습니다.");
        }

        if (data.token && data.user) {
          setLogin(data.token, data.user);
          return true;
        } else {
          clearLogin();
          return false;
        }
      } catch (error) {
        clearLogin();
        return false;
      }
    },
    retry: false,
  });
};


export const useLogout = () => {
  const { clearLogin } = useLoginStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await loginApi.logout();

        if (!data || !data.data) {
          return data?.data;
        } else {
          throw new Error("로그아웃에 실패하였습니다.");
        }
      } catch (error) {
        return false;
      }
    },
    onSuccess: (success) => {
      if (success) {
        clearLogin();
        queryClient.removeQueries({ queryKey: ['validateToken'] });
      }
    },
  });
};