import Image from 'next/image'
import React from 'react'

type RecipeProps = {
    prompt: string,
    style: string,
    imageSrc: string,
    reverse?: boolean,
}

const RecipeSection = (props: RecipeProps) => {

    const { prompt, style, imageSrc, reverse } = props;

    return (
        <>
            <section className={['flex gap-[2%] lg:flex-row md:flex-row flex-col', reverse ? 'lg:flex-row-reverse md:flex-row-reverse' : ''].join(' ')}>
                <Image
                    src={imageSrc}
                    alt={'Example images generated with ambiguous prompts'}
                    width={350}
                    height={420}
                    className='rounded lg:w-[50%] md:w-[50%] w-full mx-auto'
                />
                <div className='p-[5%] lg:w-[50%]'>
                    <p className='font-bold text-[2rem]'>Prompt</p>
                    <p className='lg:my-[3%] md:my-[3%] lg:mb-[10%] md:mb-[7%] mb-[3%]'>{prompt}</p>
                    <br />
                    <p className='font-bold text-[1.5rem]'>Style</p>
                    <p className='lg:my-[3%] md:my-[3%] mb-[10%]'>{style}</p>
                </div>
            </section>
            <br />
        </>
    )
}

export default RecipeSection
