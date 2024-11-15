import { z } from 'zod';

// 기본 전화번호 형식 검증을 위한 정규식
const phoneRegex = /^01[016789]\d{7,8}$/;

// 우편번호 검증을 위한 정규식
const postcodeRegex = /^\d{5}$/;

// 이메일 검증을 위한 정규식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const orderSchema = z.object({
  // 주문자 정보
  ordererName: z
    .string()
    .min(2, '주문자 이름은 2자 이상이어야 합니다')
    .max(50, '주문자 이름은 50자를 초과할 수 없습니다'),
  ordererPhone: z
    .string()
    .regex(phoneRegex, '올바른 휴대폰 번호를 입력해주세요 (예: 01012345678)'),
  ordererEmail: z
    .string()
    .regex(emailRegex, '올바른 이메일 주소를 입력해주세요'),

  // 수령인 정보
  receiverName: z
    .string()
    .min(2, '수령인 이름은 2자 이상이어야 합니다')
    .max(50, '수령인 이름은 50자를 초과할 수 없습니다'),
  receiverPhone: z
    .string()
    .regex(phoneRegex, '올바른 휴대폰 번호를 입력해주세요 (예: 01012345678)'),

  // 배송지 정보
  postcode: z
    .string()
    .regex(postcodeRegex, '올바른 우편번호를 입력해주세요 (예: 12345)'),
  address1: z
    .string()
    .min(1, '기본주소를 입력해주세요')
    .max(100, '기본주소는 100자를 초과할 수 없습니다'),
  address2: z
    .string()
    .max(100, '상세주소는 100자를 초과할 수 없습니다')
    .optional(),

  // 배송 요청사항
  deliveryRequest: z
    .enum(['door', 'security', 'callme', 'safe'])
    .optional(),

  // 결제 수단
  paymentMethod: z.enum(['card', 'transfer', 'virtual'], {
    invalid_type_error: '올바른 결제 수단을 선택해주세요',
  }),

  // 주문 상품 정보
  productId: z.number(),
  count: z.number().min(1, '최소 1개 이상 주문해야 합니다'),
});

export type OrderFormData = z.infer<typeof orderSchema>;