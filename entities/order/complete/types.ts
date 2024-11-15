export interface OrderCompleteResponse {
    orderId: string;
    status: string;
    orderDate: string;
    
    // 주문자 정보
    ordererName: string;
    ordererPhoneNumber: string;
    ordererEmail: string;
    
    // 배송 정보
    receiverName: string;
    receiverPhoneNumber: string;
    address: {
      zipcode: string;
      city: string;
      street: string;
    };
    deliveryRequest: string;
    deliveryCompany: string;
    trackingNumber: string;
    deliveryStatus: string;
    deliveryDate: string;
    
    // 결제 정보
    paymentMethod: string;
    totalAmount: number;
    
    // 주문 상품 정보
    orderProducts: OrderCompleteProduct[]
  }

  export interface OrderCompleteProduct {
    productId: string;
    koreanName: string;
    englishName: string;
    brandKoreanName: string;
    brandEnglishName: string;
    price: number;
    imageUrl: string;
    categoryId: string;
    stockQuantity: number;
  }
  