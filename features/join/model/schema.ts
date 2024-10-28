// features/join/model/schema.ts
import { z } from 'zod';

export const joinFormSchema = z.object({
  name: z.string()
    .min(2, '이름은 2글자 이상이어야 합니다.')
    .max(50, '이름은 50글자를 초과할 수 없습니다.'),
  email: z.string()
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'),
  confirmPassword: z.string(),
  phoneNumber: z.string()
    .regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, '올바른 전화번호 형식이 아닙니다.'),
  address: z.object({
    city: z.string().min(1, '도시를 입력해주세요.'),
    street: z.string().min(1, '상세주소를 입력해주세요.'),
    zipcode: z.string()
      .regex(/^\d{5}$/, '올바른 우편번호 형식이 아닙니다.')
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});
