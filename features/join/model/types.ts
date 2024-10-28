// features/join/model/types.ts
export interface JoinFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    address: {
      city: string;
      street: string;
      zipcode: string;
    };
  }
  