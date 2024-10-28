// features/join/model/queries.ts
import { useMutation } from '@tanstack/react-query';
import { joinApi } from '@/entities/join/api';
import { JoinFormData } from './types';
import { JoinRequest } from '@/entities/join/types';

export const useJoinMutation = () => {
  return useMutation({
    mutationFn: (formData: JoinFormData) => {
      // JoinFormData를 JoinRequest 형식으로 변환
      const joinRequest: JoinRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        city: formData.address.city,
        street: formData.address.street,
        zipcode: formData.address.zipcode
      };
      
      return joinApi.join(joinRequest);
    }
  });
};
