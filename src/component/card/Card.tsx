type CardProps = {
    mainHeading?: string,
    subHeading?: string,
    bgImage?: string,
}

const Card = (props: CardProps) => {

    const { mainHeading, subHeading, bgImage } = props;

    const bgStyle = {
        backgroundImage: bgImage ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bgImage})` : '',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return (
        <article className='relative mx-auto h-[25rem] w-[98%] my-[3%] md:w-[100%] lg:w-[28rem] rounded-[25px]' style={bgStyle}>

            <h3 className='absolute top-[15%] left-[5%] text-[2rem] text-white'>{mainHeading}</h3>
            <h4 className='absolute top-[5%] left-[5%] text-[1.2rem] text-gray-400'>{subHeading}</h4>
        </article>
    )
}

export default Card
