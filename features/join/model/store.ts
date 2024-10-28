// features/join/model/store.ts
import { create } from 'zustand';
import { JoinFormData } from './types';

interface JoinFormState {
  data: JoinFormData;
  isLoading: boolean;
  error: string | null;
  setField: (field: keyof Omit<JoinFormData, 'address'>, value: string) => void;
  setAddressField: (field: keyof JoinFormData['address'], value: string) => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState: JoinFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address: {
    city: '',
    street: '',
    zipcode: ''
  }
};

export const useJoinFormStore = create<JoinFormState>((set) => ({
  data: initialState,
  isLoading: false,
  error: null,
  setField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value }
    })),
  setAddressField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        address: { ...state.data.address, [field]: value }
      }
    })),
  reset: () => set({ data: initialState, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));
