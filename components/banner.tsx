"use client";

interface BannerProps {
    title: string;
    subtitle: string;
    backgroundColor: string; // 배경색 속성 추가
    buttonText: string;
    onButtonClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundColor, buttonText, onButtonClick }) => {
    return (
        <div 
            className="relative w-full h-64" 
            style={{ backgroundColor }}
        >
            {/* 배너 내용 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-lg mb-4 bannerTit">{title}</p>
                <button
                    onClick={onButtonClick}
                    className="px-4 py-2 bg-primary rounded transition"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Banner;
