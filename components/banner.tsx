import Image from 'next/image';

interface BannerProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    buttonText: string;
    onButtonClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, imageUrl, buttonText, onButtonClick }) => {
    return (
        <div className="relative w-full h-64">
        {/* 배경 이미지 */}
        <Image
            src={imageUrl}
            alt="Banner Background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
        />

        {/* 배너 내용 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
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
