'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BannerProps {
    title: string;
    imageUrl: string;
    linkUrl: string;
}

const banners: BannerProps[] = [
    {
        title: '회원가입 시 3만원 쿠폰팩 증정!',
        imageUrl: '/images/topbanner1.jpg',
        linkUrl: '/',
    },
    {
        title: '가을맞이 시즌 할인 ~11/31',
        imageUrl: '/images/topbanner2.jpg',
        linkUrl: '/',
    },
    {
        title: '2024 BEST 브랜드 바로가기',
        imageUrl: '/images/topbanner3.jpg',
        linkUrl: '/',
    },
    ];

    const TopBanner: React.FC = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    // 일정 시간마다 배너가 변경되는 useEffect
    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // 5초마다 배너 변경

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
    }, []);

    const currentBanner = banners[currentBannerIndex];


    return (
            <div
            className="relative w-full h-20 cursor-pointer"
            >
            <Image
                src={currentBanner.imageUrl}
                alt="Top Banner Background"
                fill
                objectFit="cover"
                className=""
            />
        
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-xl mb-1">{currentBanner.title} <span className="font-normal"></span></h2>
            </div>
        
            <div className="absolute bottom-2 right-4 flex space-x-2">
                {banners.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-white' : 'bg-gray-400'}`}
                    onClick={(e) => {
                    e.stopPropagation(); // 버튼 클릭 시 배너 클릭 방지
                    setCurrentBannerIndex(index);
                    }}
                />
                ))}
            </div>
            </div>
        );
    };

export default TopBanner;
