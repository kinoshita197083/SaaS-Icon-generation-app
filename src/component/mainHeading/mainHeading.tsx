type MainHeadingProps = {
    heading: string,
}

const MainHeading = ({ heading }: MainHeadingProps) => {

    return (
        <h1 className='text-5xl leading-[1.2] max-w-[60%] md:leading-[1.3] lg:text-7xl lg:leading-[1.2] font-semibold'>
            {heading}
        </h1>
    )
}

export default MainHeading