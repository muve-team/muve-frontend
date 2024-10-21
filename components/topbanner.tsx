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
        title: '공식몰 가입혜택',
        imageUrl: 'https://images.unsplash.com/photo-1600504511046-f10b78a04e0e?w=500&auto=format&fit=crop&q=60',
        linkUrl: '/',
    },
    {
        title: '한정 특별 행사!',
        imageUrl: 'https://images.unsplash.com/photo-1600504511046-f10b78a04e0e?w=500&auto=format&fit=crop&q=60',
        linkUrl: '/',
    },
    {
        title: '여름 시즌 할인!',
        imageUrl: 'https://images.unsplash.com/photo-1592756209383-3c52fb77ee6f?w=500&auto=format&fit=crop&q=60',
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
                className="rounded-lg"
            />
        
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                <h2 className="text-xl font-bold mb-1">{currentBanner.title}</h2>
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
