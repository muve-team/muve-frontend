// features/session/hooks/use-login.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '../model/store';
import { useLogout, useValidateToken } from '../model/queries';

export const useLogin = () => {
  const router = useRouter();
  const { token, user, isAuthenticated, setLogin, clearLogin } = useLoginStore();
  const { mutateAsync: logoutMutation } = useLogout();

  useValidateToken();

  const handleLogout = async () => {
    try {
      const success = await logoutMutation();
      if (success) {
        router.push('/');
      }
      clearLogin();
      return success;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };

  return {
    token,
    user,
    isAuthenticated,
    logout: handleLogout,
  };
};
