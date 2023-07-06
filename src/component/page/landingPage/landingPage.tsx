import React from 'react';
import styles from './landingPage.module.css';
import MainHeading from '~/component/mainHeading/mainHeading';
import Button from '~/component/button/button';
import Poster from '~/component/poster/poster';
import Card from '~/component/card/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {

    return (
        <div className={styles.page}>
            <section className='pl-[8%] md:pl-[15%] lg:pl-[15%]'>
                <MainHeading heading={'An Icon generator App that XXX XXX'} />
                <br />
                <div className='flex items-center gap-[3%] lg:gap-[1%]'>
                    <Link href={'/generate'}>
                        <Button boxShadow>Get started</Button>
                    </Link>
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
                <Card mainHeading='XXX icons have been created so far!' subHeading='another text' bgImage='./brad.jpg'></Card>
            </section>

            <section className='w-full lg:w-[78%] h-[20rem] bg-sky-800 rounded-[25px] mx-auto flex relative p-8 bg-gradient-to-r from-sky-500 to-indigo-500'>
                <article className=''>
                    <h4 className='text-white'>Sign up to start brainstorming your own icon</h4>
                    <h3 className='text-[3rem] text-white'>Join xxx users</h3>
                </article>

                <div className='flex items-center justify-center gap-[5%] mb-[5%] absolute bottom-0 right-10'>
                    <Link href={'/generate'}>
                        <Button boxShadow>Start imagining</Button>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default LandingPage
