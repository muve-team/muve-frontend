'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/merged/Input';
import { Button } from '@/components/ui/merged/Button';
import { Label } from '@/components/ui/merged/Label';
import { useLoginStore } from '@/features/login/model/store';
import { useLoginMutation } from '@/features/login/model/queries';
import { loginSchema } from '../../model/schema';
import type { LoginFormData } from '../../model/types';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';

// const { isDark, toggleTheme } = useTheme();

export function LoginForm() {
  const router = useRouter();
  const login = useLoginStore((state) => state.setLogin);
  const loginMutation = useLoginMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      
      if (response.result === 'SUCCESS' && response.data) {
        login(response.data.token, response.data.user);
        router.push('/');
      } else {
        setError('root', {
          type: 'manual',
          message: response.message || '로그인에 실패했습니다.',
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-8">
        <Image src="/images/muve_logo.png" alt="로고" width={140} height={140} />
        </div>
      <div>
        {/* <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          이메일
        </Label> */}
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="이메일을 입력하세요"
          className="inputUnderline mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="my-12">
        {/* <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          비밀번호
        </Label> */}
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="비밀번호를 입력하세요"
          className="inputUnderline mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-white dark:bg-gray-50 dark:text-black"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>

    <div className='flex justify-between items-center'>
    <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline dark:text-white"
        >
          이메일/비밀번호 찾기
        </Link>
      </div>
      <hr/>
      <div className="text-center">
        <Link
          href="/join"
          className="text-sm text-primary hover:underline dark:text-white"
        >
          회원가입
        </Link>
      </div>
    </div>
    </form>
  );
}