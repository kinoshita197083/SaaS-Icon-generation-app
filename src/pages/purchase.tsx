import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'
import PricingBox from '~/component/pricingBox'
import styles from '../styles/purchase.module.css'
import PageTemplate from '~/component/page/pageTemplate'

const Purchase: NextPage = () => {

    useEffect(() => {
        window.scrollTo(50, 50)
    }, [])

    return (
        <>
            <Head>

            </Head>

            <PageTemplate>
                <main className='flex flex-col w-full h-full'>
                    <section role='heading'
                        className='mb-[6%]'>
                        <h1 className='text-6xl text-gray-200'>
                            Pricing
                        </h1>
                        <p className='mt-[3%] text-2xl text-gray-300'>
                            Flexible plan to fit your needs
                        </p>
                    </section>

                    <section className={styles.pricingContainer}>
                        <PricingBox
                            plan={'Give it a Try'}
                            price={'AUD $7'}
                            eachCost='$0.14'
                        />
                        <PricingBox
                            plan={'I have ideas'}
                            price={'AUD $13'}
                            popular
                            promotion={'Fresh Beginnings Sale'}
                        />
                        <PricingBox
                            plan={'Make something grand'}
                            price={'AUD $27'}
                        />
                    </section>
                </main>
            </PageTemplate>

        </>
    )
}

export default Purchase
