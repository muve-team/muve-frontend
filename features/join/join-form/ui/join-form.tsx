"use client";

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/merged/Button';
import { Card, CardContent } from '@/components/ui/merged/Card';
import { FormField } from './form-field';
import { AddressFields } from './address-fields';
import { useJoinFormStore } from '../../model/store';
import { useJoinMutation } from '../../model/queries';

export const JoinForm = () => {
  const router = useRouter();
  const { data, setField, isLoading, setLoading, setError } = useJoinFormStore();
  const joinMutation = useJoinMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await joinMutation.mutateAsync(data);
      if (result.result === 'SUCCESS') {
        router.push('/login');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="name"
            label="이름"
            value={data.name}
            onChange={(value) => setField('name', value)}
            placeholder="이름을 입력하세요"
          />
          <FormField
            id="email"
            label="이메일"
            type="email"
            value={data.email}
            onChange={(value) => setField('email', value)}
            placeholder="이메일을 입력하세요"
          />
          <FormField
            id="password"
            label="비밀번호"
            type="password"
            value={data.password}
            onChange={(value) => setField('password', value)}
            placeholder="비밀번호를 입력하세요"
          />
          <FormField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={data.confirmPassword}
            onChange={(value) => setField('confirmPassword', value)}
            placeholder="비밀번호를 다시 입력하세요"
          />
          <FormField
            id="phoneNumber"
            label="전화번호"
            value={data.phoneNumber}
            onChange={(value) => setField('phoneNumber', value)}
            placeholder="전화번호를 입력하세요"
          />
          <AddressFields />
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '회원가입'}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
