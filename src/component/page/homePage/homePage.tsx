import React from 'react';
import BannerCard from '~/component/bannerCard';

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
                            mainHeading='Remove Background'
                            subHeading='FEATURED'
                            bgImage='/chihuahua.png'
                            link='removebackground'
                        />
                    </div>
                </div>
            </section>

            <section className=''>
                {/* <Collection collectionName='Browse'>

                </Collection> */}
            </section>

        </div>
    )
}

export default HomePage
