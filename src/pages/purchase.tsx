import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import PricingBox from '~/component/pricingBox'
import styles from '../styles/purchase.module.css'
import PageTemplate from '~/component/page/pageTemplate'
import { useBuyCredits } from '~/hooks/useBuyCredits'
import { Backdrop, CircularProgress } from '@mui/material'
import CustomHead from '~/component/head'

const Purchase: NextPage = () => {

    const [isLoading, setLoading] = useState(false);

    const { handleBuyCredits } = useBuyCredits();

    return (
        <>
            <CustomHead
                title="Buy Credits - Imagin"
                description="Purchase credits to test out your ideas and boost your imagination further."
                follow
            />

            <PageTemplate>
                <div className='flex flex-col w-full h-full mt-[5%] lg:mt-0 md:mt-0'>
                    <section role='heading'
                        className='mb-[6%]'>
                        <h1 className='lg:text-6xl md:text-6xl text-3xl text-gray-200'>
                            Pricing
                        </h1>
                        <p className='mt-[3%] lg:text-2xl md:text-2xl text-1xl text-gray-300'>
                            Flexible plan to fit your needs
                        </p>
                    </section>

                    <section className={styles.pricingContainer}>
                        <PricingBox
                            plan={'STARTER'}
                            price={'AUD $7'}
                            credits={'55'}
                            eachCost='$0.13'
                            handleClick={() => handleBuyCredits(1, setLoading)}
                        />
                        <PricingBox
                            plan={'DREAMER'}
                            price={'AUD $13'}
                            credits={'160'}
                            popular
                            eachCost='$0.08'
                            promotion={'Fresh Beginnings Sale'}
                            saving={'38%'}
                            handleClick={() => handleBuyCredits(2, setLoading)}
                        />
                        <PricingBox
                            plan={'PRO'}
                            price={'AUD $27'}
                            credits={'270'}
                            eachCost='$0.1'
                            handleClick={() => handleBuyCredits(3, setLoading)}
                        />
                    </section>
                </div>

                {isLoading &&
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            </PageTemplate>

        </>
    )
}

export default Purchase
