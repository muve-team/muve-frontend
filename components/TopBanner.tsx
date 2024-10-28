'use client';

import Image from 'next/image';

interface BannerProps {
    title: string;
    imageUrl: string;
    linkUrl: string;
}

const currentBanner: BannerProps = {
    title: '지금 무브 회원가입 시 3만원 쿠폰팩 증정!',
    imageUrl: '/images/topbanner3.jpg',
    linkUrl: '/',
};

const TopBanner: React.FC = () => {
    return (
        <div className="relative w-full h-20 cursor-pointer">
            <Image
                src={currentBanner.imageUrl}
                alt="Top Banner Background"
                fill
                // objectFit="cover"
                className=""
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-xl mb-1">{currentBanner.title} <span className="font-normal"></span></h2>
            </div>
        </div>
    );
};

export default TopBanner;
