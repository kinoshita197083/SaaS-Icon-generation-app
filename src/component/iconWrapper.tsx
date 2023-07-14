import Image from 'next/image'
import React from 'react'
import ReadMore from './readMore';

type IconWrapper = {
    src: string,
    heading?: string,
    content?: string,
}

const IconWrapper = (props: IconWrapper) => {

    const { src, heading, content } = props;

    return (
        <div className='relative blur-dark p-[3%] rounded-[20px] md:rounded-[13px] lg:rounded-[15px] w-[6rem] lg:w-[10rem] md:w-[10rem] h-[max-content] mx-auto'>
            <Image
                src={src}
                className='w-full rounded-[15px]'
                width='100'
                height='100'
                alt='previously generated icon'
            />

            <h3 className='hidden md:block lg:block text-gray-100 text-center mb-[5%] overflow-scroll whitespace-nowrap'>
                {heading}
            </h3>

            {content &&
                <ReadMore cutoff={0}>
                    {content}
                </ReadMore>}

        </div>
    )
}

export default IconWrapper
