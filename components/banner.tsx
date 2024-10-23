"use client";

interface BannerProps {
    title: string;
    subtitle: string;
    backgroundColor: string;
    backgroundImage?: string;
    buttonText: string;
    onButtonClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundColor, backgroundImage, buttonText, onButtonClick }) => {
    return (
        <div 
            className="relative w-full h-64" 
            style={{ backgroundImage: `url('/images/deliver_banner.png')`,backgroundSize: 'cover', 
                backgroundPosition: 'center'  }}
        >
            {/* 배너 내용 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-lg mb-4 text-black bannerTit">{title}</p>
                <button
                    onClick={onButtonClick}
                    className="px-4 py-2 bg-primary rounded transition mt-5"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Banner;
