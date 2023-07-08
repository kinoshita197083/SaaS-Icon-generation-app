import Link from 'next/link';

type BannerCardProps = {
    mainHeading?: string,
    subHeading?: string,
    bgImage?: string,
    link?: string
}

const BannerCard = (props: BannerCardProps) => {

    const { mainHeading, subHeading, bgImage, link } = props;

    const bgStyle = {
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const defaultStyle = "relative rounded-[25px] lg:h-[14rem] lg:w-[14rem] md:w-[45%] h-[auto] w-[70%] aspect-square cursor-pointer mx-auto hover:scale-[1.02] transition-all";

    return (
        <Link href={link || '/'}>
            <div className={defaultStyle} style={bgStyle}>
                <div className="absolute rounded-bl-[inherit] rounded-br-[inherit] md:h-[1.9rem] lg:h-[4rem] w-full p-3 bottom-0 lg:bg-black opacity-[70%]">
                    <h4 className="text-[0]  lg:text-[0.8rem] text-gray-200">{subHeading}</h4>
                    <h3 className="text-[0]  lg:text-[1.2rem] text-white">{mainHeading}</h3>
                </div>

            </div>
        </Link>
    )
}

export default BannerCard
