import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import IconWrapper from '~/component/iconWrapper'
import { api } from '~/utils/api'
import styles from '../styles/community.module.css'
import PageTemplate from '~/component/page/pageTemplate'
import CloseButton from '~/component/closeButton'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { env } from '~/env.mjs'
import Spinner from '~/component/spinner'

const Community: NextPage = () => {

    const limit = 50;
    const scrollContainerRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetching } = api.icons.getAllUsersIcons.useInfiniteQuery(
        {
            limit: limit,
            // categoryId: category?.id, // this is optional - remember
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    useInfiniteScroll(scrollContainerRef, hasNextPage, isFetching, fetchNextPage)

    // data will be split in pages
    const allIcons = data?.pages.flatMap((page) => page.iconIds) || [];


    return (
        <>
            <Head>

            </Head>
            <PageTemplate>
                <div className='flex flex-col w-full'>
                    <section className='w-full lg:mt-[0%] mt-[5%]'>
                        <h1 className='text-gray-200 lg:text-[3.5rem] md:text-[3rem] text-[2rem] w-full'>Trending on the community</h1>
                        <h4 className='text-gray-300 text-[1.5rem] my-[5%]'>Results: {allIcons?.length}</h4>
                    </section>

                    <section className={styles.iconsContainer}
                        ref={scrollContainerRef}>
                        {allIcons?.map(icon => {

                            const iconSrc = `${env.NEXT_PUBLIC_BUCKET}${icon.id}`;

                            return (
                                <div key={icon.id} className='lg:my-[0] md:my-[0] my-[2%]'>
                                    <IconWrapper
                                        src={iconSrc}
                                        heading={icon.prompt || ''}
                                    />
                                </div>
                            )
                        })}
                    </section>

                    <Spinner
                        isLoading={isFetching}
                    />
                </div>
                <CloseButton />
            </PageTemplate>
        </>

    )
}

export default Community
