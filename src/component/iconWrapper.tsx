import Image from 'next/image'
import React from 'react'

type IconWrapper = {
    iconId?: string,
    iconSrc: string,
    handleClick?: () => void,
}

const IconWrapper = (props: IconWrapper) => {

    const { iconId, iconSrc, handleClick } = props;

    return (
        <div key={iconId} className='lg:my-[6%] md:my-[0] my-[5%] mx-[auto] cursor-pointer snap-always' onClick={handleClick}>
            <Image
                src={iconSrc}
                className='rounded-[15px] lg:w-[10rem] md:w-[8rem] w-[6rem]'
                width='65'
                height='65'
                alt='previously generated icon'
            />
        </div>
    )
}

export default IconWrapper
