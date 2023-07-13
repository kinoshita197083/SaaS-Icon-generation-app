import React from 'react';
import styles from './landingPage.module.css'
import Button from '~/component/button';
import Poster from '~/component/poster/poster';
import Card from '~/component/card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { api } from '~/utils/api';

const LandingPage = () => {

    const users: number | undefined = api.statistic.getStatistic.useQuery().data?.[0];
    const icons: number | undefined = api.statistic.getStatistic.useQuery().data?.[1];

    return (
        <div className='px-[2%] md:px-[3%] lg:px-[8%]'>
            <section className='pl-[5%] md:px-[15%] lg:pl-[15%] animate-fadein'>
                <h1 className='text-5xl leading-[1.2] max-w-[80%] lg:max-w-[70%] md:text-6xl md:leading-[1.3] lg:text-7xl lg:leading-[1.2] font-semibold'>
                    An <span className={styles.animateCharacter}>Icon generator</span> App that XXX XXX
                </h1>
                <br />
                <div role='button-group'>
                    <Link href={'/generate'}>
                        <Button>Get started</Button>
                    </Link>
                    <span className='mr-[1%]' />
                    <Button
                        bgColor={'transparent'}
                        borderColor='tomato'
                        textColor='tomato'
                    ><FontAwesomeIcon icon={faProductHunt} /> Product Hunt</Button>
                </div>
            </section>

            <Poster />

            <section className={styles.cardContainer}>
                <Card mainHeading='Just a bunch of text' subHeading='another text' bgImage='./matrix.jpg'></Card>
                <Card mainHeading={`${icons} icons have been created so far!`} subHeading='another text' bgImage='./brad.jpg'></Card>
            </section>

            <section className='lg:w-[78%] h-[20rem] bg-sky-800 rounded-[25px] mx-auto flex relative p-8 bg-gradient-to-r from-sky-500 to-indigo-500'>
                <article className=''>
                    <h4 className='text-white'>Sign up to start brainstorming your own icon</h4>
                    <h3 className='text-[3rem] text-white'>Join {users || 'xxx'} users</h3>
                </article>

                <div className='flex items-center justify-center gap-[5%] mb-[5%] absolute bottom-0 right-10'>
                    <Link href={'/generate'}>
                        <Button>Start imagining</Button>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default LandingPage
