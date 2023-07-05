type BannerCardProps = {
    mainHeading?: string,
    subHeading?: string,
    bgImage?: string
}

const BannerCard = (props: BannerCardProps) => {

    const { mainHeading, subHeading, bgImage } = props;

    const bgStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
        <div className="relative rounded-[25px] lg:h-[16rem] lg:w-[16rem] md:w-[45%] h-[auto] w-[70%] aspect-square cursor-pointer mx-auto hover:scale-[1.02] transition-all" style={bgStyle}>
            <div className="absolute rounded-bl-[inherit] rounded-br-[inherit] md:h-[1.9rem] lg:h-[4rem] w-full p-3 bottom-0 lg:bg-gray-800 md:bg-gray-800">
                <h4 className="text-[0] md:text-[0.7rem] lg:text-[0.8rem] text-gray-400">{subHeading}</h4>
                <h3 className="text-[0] md:text-[1.1rem] lg:text-[1.2rem] text-white">{mainHeading}</h3>
            </div>
        </div>
    )
}

export default BannerCard
