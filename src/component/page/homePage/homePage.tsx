import React from 'react';
import styles from '../../../styles/homePage.module.css';
import BannerCard from '~/component/bannerCard';
import Collection from '~/component/collection';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className='min-h-full p-[8%] pt-[5%]'>
            <section className='bg-[url(/scenery.jpg)] bg-cover bg-no-repeat bg-center rounded-[25px]'>
                <Collection
                    collectionName='App'
                    darkness
                >
                    <Link href={'/generate'}>
                        <BannerCard
                            mainHeading='Icon Generation'
                            subHeading='FEATURED'
                            bgImage='/ape.jpg'
                        />
                    </Link>

                    <BannerCard
                        mainHeading='Community'
                        subHeading='COLLECTION'
                        bgImage='/community.png'
                    />
                </Collection>
            </section>

            <section className=''>
                {/* <Collection collectionName='Browse'>

                </Collection> */}
            </section>

        </div>
    )
}

export default HomePage
