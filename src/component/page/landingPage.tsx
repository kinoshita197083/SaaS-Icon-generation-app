import React from 'react';
import styles from '../../styles/landingPage.module.css'
import Button from '~/component/button';
import Poster from '~/component/poster';
import Card from '~/component/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { api } from '~/utils/api';
import AdBanner from '../adBanner';

const LandingPage = () => {

    const users: number | undefined = api.statistic.getStatistic.useQuery().data?.[0] || 0;
    const icons: number | undefined = api.statistic.getStatistic.useQuery().data?.[1] || 0;

    return (
        <div className='px-[2%] md:px-[3%] lg:px-[8%]'>
            <section className='pl-[5%] md:px-[15%] lg:pl-[15%] animate-fadein'>
                <h1 className='text-6xl leading-[1.2] max-w-[80%] lg:mt-[5%] lg:max-w-[70%] md:text-6xl md:leading-[1.3] lg:text-7xl lg:leading-[1.2] font-semibold'>
                    <span className={styles.animateCharacter}>Icon Generator</span>
                    <span className='text-5xl lg:text-6xl'>Unleash Visual Brilliance</span>
                </h1>
                <h3 className='leading-[1.5] mt-[3%]'>Effortlessly Create Eye-Catching Icons</h3>
                <br />
                <div role='button-group'>
                    <Link href={'/get-started'}>
                        <Button>Get started</Button>
                    </Link>
                    <span className='mr-[2%]' />
                    <Button
                        bgColor={'transparent'}
                        borderColor='tomato'
                        textColor='tomato'
                    ><FontAwesomeIcon icon={faProductHunt} /> Product Hunt</Button>
                </div>
            </section>

            <Poster />

            <section className={styles.cardContainer}>
                <Link href={'/purchase'} className='lg:mx-[auto] md:mb-[1%]'>
                    <Card mainHeading='Fresh Beginning Sales' subHeading="It's happening !" bgImage='./sample_girl.png'></Card>
                </Link>
                <Card mainHeading={`Celebrating ${icons} Creative Creations!`} subHeading='Iconic Milestone' bgImage='./fuji.png'></Card>
            </section>

            <AdBanner
                src='/ape.jpg'>
                <p className='text-gray-100 hidden lg:block'>Embrace Iconic Possibilities</p>
                <article className='mt-0 lg:mt-[22%] lg:pl-0 pl-[12%]'>
                    <h4 className='text-white'>Join Now and Dive into Icon Brainstorming</h4>
                    <h3 className='text-[3rem] text-white'>Join {users || 'xxx'} users</h3>
                </article>
                <div className='flex items-center justify-center gap-[5%] mb-[5%] absolute bottom-0 right-10'>
                    <Link href={'/generate'}>
                        <Button>Start imagining</Button>
                    </Link>
                </div>
            </AdBanner>

        </div>
    )
}

export default LandingPage
