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
        <div className='relative blur-dark p-[5%] rounded-[15px] w-[15rem] h-[max-content] mx-auto'>
            <Image
                src={src}
                className='w-full rounded'
                width='100'
                height='100'
                alt='previously generated icon'
            />

            <h3 className='text-gray-100 text-center mb-[5%] overflow-scroll whitespace-nowrap'>
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
