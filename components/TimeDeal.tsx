// import { useState, useEffect } from 'react';
// import { ProductCard } from '@/components/product-card';
// import { Card, CardContent } from '@/components/ui/card';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// interface TimeDealProduct {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   endTime: string;
//   category: string;
// }

// interface TimeDealProps {
//   products: TimeDealProduct[];
// }

// export function TimeDeal({ products: initialProducts }: TimeDealProps) {
//   const [products, setProducts] = useState<TimeDealProduct[]>(initialProducts || []);
//   const [timeLeft, setTimeLeft] = useState<string[]>([]);

//   useEffect(() => {
//     setProducts(initialProducts);
//   }, [initialProducts]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const newTimeLeft: string[] = [];
//       const updatedProducts = products.filter((product, index) => {
//         const diff = new Date(product.endTime).getTime() - now.getTime();
//         if (diff <= 0) return false;
//         const hours = Math.floor(diff / (1000 * 60 * 60))
//           .toString()
//           .padStart(2, '0');
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
//           .toString()
//           .padStart(2, '0');
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000)
//           .toString()
//           .padStart(2, '0');
//         newTimeLeft[index] = `${hours}:${minutes}:${seconds}`;
//         return true;
//       });
//       setTimeLeft(newTimeLeft);
//       setProducts(updatedProducts);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [products]);

//   if (products.length === 0) {
//     return null;
//   }

//   return (
//     <section className="my-20 relative">
//       <h2 className="text-3xl mb-6 text-center">오늘의 특가상품</h2>
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//           },
//           768: {
//             slidesPerView: 3,
//           },
//           1024: {
//             slidesPerView: 4,
//           },
//         }}
//       >
//         {products.map((product, index) => (
//           <SwiperSlide key={product.id}>
//             <Card className="w-full overflow-hidden relative">
//               <div className="absolute top-0 left-0 right-0 z-10 text-white text-center py-3 font-bold text-lg bg-primary">
//                 남은 시간: {timeLeft[index]}
//               </div>
//               <CardContent className="p-0 pt-12">
//                 <ProductCard {...product} />
//               </CardContent>
//             </Card>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }
