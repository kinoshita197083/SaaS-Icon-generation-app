import React from 'react';
import styles from './landingPage.module.css';
import MainHeading from '~/component/mainHeading/mainHeading';
import Button from '~/component/button/button';
import Poster from '~/component/poster/poster';
import Card from '~/component/card/Card';

const LandingPage = () => {

    return (
        <div className={styles.page}>
            <section className='pl-[8%] md:pl-[15%] lg:pl-[15%]'>
                <MainHeading heading={'A story generator App that XXX XXX'} />
                <br />
                <Button boxShadow>Get started</Button>
            </section>

            <Poster />

            <section className='container-sup grid'>
                <Card paragraph='Just a bunch of text'>{<i className="fa-solid fa-magnifying-glass-chart"></i>}</Card>
                <Card paragraph='Just a bunch of text'>{<i className="fa-solid fa-magnifying-glass-chart"></i>}</Card>
                <Card paragraph='Just a bunch of text'>{<i className="fa-solid fa-magnifying-glass-chart"></i>}</Card>
            </section>

            <div className='flex items-center justify-center gap-[5%] mb-[5%]'>
                <Button boxShadow>Start imagining</Button>
            </div>
        </div>
    )
}

export default LandingPage
