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
        <div className="rounded-[25px] lg:h-[30rem] lg:w-[30rem] h-[30rem] w-[100%] cursor-pointer mx-auto hover:scale-[1.02] transition-all" style={bgStyle}>
            <div className="rounded-tl-[inherit] rounded-tr-[inherit] h-[6rem] w-full p-3 bg-gray-800">
                <h4 className="text-[1.3rem] text-gray-400">{subHeading}</h4>
                <h3 className="text-[2rem] text-white">{mainHeading}</h3>
            </div>
        </div>
    )
}

export default BannerCard
