// types/global.d.ts

interface DaumPostcode {
    embed: (container: HTMLElement | string, options?: any) => void;
    open: (options?: any) => void;
  }
  
  interface DaumPostcodeConstructor {
    new (options: {
      oncomplete: (data: {
        address: string;
        zonecode: string;
        addressType: string;
        userSelectedType: string;
        roadAddress: string;
        jibunAddress: string;
      }) => void;
      onclose?: () => void;
      animation?: boolean;
    }): DaumPostcode;
  }
  
  declare global {
    interface Window {
      daum: {
        Postcode: DaumPostcodeConstructor;
      };
    }
  }
  
  export {};