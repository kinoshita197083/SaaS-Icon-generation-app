import React, { ReactNode } from 'react'
import Button from './button'
import Image from 'next/image'

type AdBannerProps = {
    children?: ReactNode,
    src: string,
}

const AdBanner = (props: AdBannerProps) => {

    const { children, src, } = props;

    return (
        <section className='lg:w-[78%] md:w-[78%] h-[20rem] bg-sky-800 rounded-[25px] mx-auto flex relative p-8 bg-gradient-to-r from-sky-500 to-indigo-500'>
            <div className='relative rounded-[35px] w-[250px] h-[250px] shadow-0 lg:shadow-[35px_0px_1px_-16px_black]'>
                <Image
                    src={src}
                    width='450'
                    height='450'
                    alt='promotion image'
                    className='absolute inset-0 rounded-[inherit]'
                />
            </div>
            <div className='w-[65%] ml-auto'>
                {children}
            </div>
        </section>
    )
}

export default AdBanner
