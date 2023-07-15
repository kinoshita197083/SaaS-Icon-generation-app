import React from 'react';
import Carousel from '~/component/carousel';

const HomePage = () => {
    return (
        // Outer White background
        <div className='min-h-full px-[2%] lg:px-[8%] lg:py-[5%] lg:pt-[0]'>

            {/* Gradient Background */}
            <div className='bg-[url(/90s-style.png)] lg:rounded-[45px] md:rounded-[35px] rounded-[15px] bg-no-repeat bg-cover w-full h-full'>

                {/* Blur Window */}
                <div className='container-s blur-dark rounded-[inherit] h-full]'>

                    {/* Content */}
                    <div className='p-[5%] pt-[5%]'>
                        <section className='lg:mb-[10%] md:mb-[13%] mb-[18%]'>
                            <h3 className='text-gray-300 lg:mb-[2%] md:mb-[5%] mb-[10%] lg:text-[1.3em] md:text-[1.3rem]'>
                                Community & Recipe
                            </h3>
                            <h1 className='text-gray-100 font-thin lg:text-6xl md:text-5xl text-4xl max-w-[40%] leading-[1.1]'>
                                Empower Your <br />
                                <span className='font-bold'>
                                    Imagination
                                </span>
                            </h1>
                        </section>

                        <section className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mb-[5%]'>
                            <div className='aspect-square lg:w-[15rem] w-full lg:h-[15rem] bg-blue-700 rounded-[18px] lg:rounded-[28px] p-[4%] m-auto lg:mb-[0] md:mb-[2%] mb-[5%]'>
                                <h4 className='text-gray-100 text-[1.6rem]'>
                                    Community
                                </h4>
                            </div>
                            <div className='aspect-square lg:w-[15rem] w-full  lg:h-[15rem] bg-yellow-300 rounded-[18px] lg:rounded-[28px] p-[4%] m-auto lg:mb-[0] md:mx-[2%] md:mb-[2%] mb-[5%]'>
                                <h4 className='text-gray-800'>
                                    Prompt Engineering
                                </h4>
                                <img
                                    src='/lightbulb.svg'
                                    width='80%'
                                    height='80%'
                                    className='m-auto mt-[8%]'
                                />
                            </div>
                            <div className='aspect-square lg:w-[15rem] w-full lg:h-[15rem] bg-gray-100 rounded-[18px] md:mx-[2%] lg:rounded-[28px] p-[4%] m-auto'>
                                <h4 className='text-gray-500 text-[1.4rem]'>
                                    Icon Recipe
                                </h4>
                                <img
                                    src='/bread.svg'
                                    width='80%'
                                    height='80%'
                                    className='m-auto mt-[8%]'
                                />
                            </div>

                        </section>

                        <section className='bg-gray-400 h-[25rem] my-[5%] lg:my-0 lg:w-full lg:h-[31rem] rounded-[25px] overflow-hidden'>
                            <Carousel
                                images={['/Icon_recipe_1.png', '/ape.jpg', 'chihuahua.png']}
                                autoplay
                            />
                        </section>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HomePage
