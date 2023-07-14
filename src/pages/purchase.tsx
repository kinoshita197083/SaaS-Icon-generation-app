import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'
import PricingBox from '~/component/pricingBox'
import styles from '../styles/purchase.module.css'

const Purchase: NextPage = () => {

    useEffect(() => {
        window.scrollTo(50, 50)
    }, [])

    return (
        <>
            <Head>

            </Head>

            <main className='flex flex-col p-[8%]'>
                <section role='heading'
                    className='mb-[6%]'>
                    <h1 className='text-6xl'>
                        Pricing
                    </h1>
                    <p className='mt-[3%] text-2xl text-gray-500'>
                        Flexible plan to fit your needs
                    </p>
                </section>

                <section className={styles.pricingContainer}>
                    <PricingBox
                        plan={'Give it a Try'}
                        price={'$7'}
                    />
                    <PricingBox
                        plan={'I have ideas'}
                        price={'$7'}
                        popular
                        promotion={'Fresh Beginnings Sale'}
                    />
                    <PricingBox
                        plan={'Make something grand'}
                        price={'$7'}
                    />
                </section>
            </main>
        </>
    )
}

export default Purchase
