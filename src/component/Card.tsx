import Link from "next/link";

type CardProps = {
    mainHeading?: string,
    subHeading?: string,
    bgImage?: string,
    margin?: string,
    href?: string
}

const Card = (props: CardProps) => {

    const { mainHeading, subHeading, bgImage, margin, href } = props;

    const bgStyle = {
        backgroundImage: bgImage ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url(${bgImage})` : '',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: margin,
    }

    return (
        <Link href={href || ''} className='relative mx-[auto] lg:my-0 my-[2%] h-[22rem] w-full md:h-[35rem] md:my-[2%] lg:h-[25rem] lg:w-[28rem] rounded-[25px]' style={bgStyle}>
            <article>
                <h3 className='absolute top-[15%] left-[5%] text-[2rem] text-white'>{mainHeading}</h3>
                <h4 className='absolute top-[5%] left-[5%] text-[1.2rem] text-gray-300'>{subHeading}</h4>
            </article>
        </Link>
    )
}

export default Card
