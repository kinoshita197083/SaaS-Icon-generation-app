import React from 'react';
import styles from './homePage.module.css';
import BannerCard from '~/component/bannerCard';
import Collection from '~/component/collection';

const HomePage = () => {
    return (
        <div className={styles.page}>
            <Collection>
                <BannerCard
                    mainHeading='Icon Generation'
                    subHeading='FEATURED'
                    bgImage='/brad.jpg'
                />
                <BannerCard
                    mainHeading='Community'
                    subHeading='COLLECTION'
                    bgImage='/robot.jpg'
                />
            </Collection>


            <section className=''>

            </section>

        </div>
    )
}

export default HomePage
