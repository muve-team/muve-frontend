"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BannerProps {
    title: string;
    subtitle: string;
    backgroundColor: string;
    backgroundImage?: string;
    buttonText: string;
}

const onBannerClick = () => {
    console.log("배너 클릭");
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundColor, backgroundImage, buttonText }) => {
    return (
        <div 
            className="relative w-full h-64" 
            style={{ backgroundImage: `url('/images/deliver_banner.png')`,backgroundSize: 'cover', 
                backgroundPosition: 'center'  }}
        >
            {/* 배너 내용 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                

                <p className="text-2xl md:text-3xl lg:text-3xl mb-4 text-black">{title || <Skeleton />}</p>
                <button
                    onClick={onBannerClick}
                    className="px-4 py-2 bg-primary rounded transition mt-5"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Banner;
