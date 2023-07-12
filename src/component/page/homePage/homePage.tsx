import React from 'react';
import BannerCard from '~/component/bannerCard';
import Card from '~/component/Card';
import Carousel from '~/component/carousel';

const HomePage = () => {
    return (
        <div className='min-h-full px-[8%] lg:px-[18%] lg:py-[5%]'>

            <section className='bg-[url(/scenery.jpg)] bg-cover bg-no-repeat bg-center rounded-[25px]'>
                <div className='container-s blur-dark flex flex-col'>
                    <h3 className='text-white text-[1.6rem] lg:text-[3rem] mx-auto'>App</h3>
                    <div className='even-cols'>
                        <BannerCard
                            mainHeading='Icon Generation'
                            subHeading='FEATURED'
                            bgImage='/ape.jpg'
                            link='/generate'
                        />

                        <BannerCard
                            mainHeading='Edit your image'
                            subHeading='COMMING SOON'
                            bgImage='/chihuahua.png'
                            // link='removebackground'
                            disabled
                        />
                    </div>
                </div>
            </section>

            <div className='flex flex-col lg:flex-row lg:my-[3%]'>
                <div className='my-[5%] lg:p-[3%] lg:w-[45%] lg:max-w-[60%]'>
                    <h2 className='text-gray-700 text-[2.5rem] pl-[5%] md:text-[3.5rem] lg:text-[3.5rem]'>
                        <span className='animatedTitle animatedText'>Check </span>
                        <span className='animatedTitle animatedText '>out </span>
                        <span className='animatedTitle animatedText '>the </span>
                        <span className='animatedTitle animatedText'>community</span>
                    </h2>
                </div>

                <Card
                    bgImage='/community.png'
                    margin='0 0 0 auto'
                />
            </div>

            <section className='bg-gray-400 h-[25rem] my-[5%] lg:my-0 lg:w-full lg:h-[35rem] rounded-[25px]'>
                <Carousel
                    images={['/brad.jpg', '/ape.jpg', 'chihuahua.png']}
                    autoplay
                />
            </section>

        </div>
    )
}

export default HomePage
