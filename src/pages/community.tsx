import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import IconWrapper from '~/component/iconWrapper'
import { api } from '~/utils/api'
import styles from '../styles/community.module.css'
import PageTemplate from '~/component/page/pageTemplate'
import CloseButton from '~/component/closeButton'

type Icon = {
    id: string;
    prompt: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

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

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target!.isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        }, options);

        if (scrollContainerRef.current) {
            observer.observe(scrollContainerRef.current);
        }

        return () => {
            if (scrollContainerRef.current) {
                observer.unobserve(scrollContainerRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetching]);

    // data will be split in pages
    const allIcons = data?.pages.flatMap((page) => page.iconIds) || [];


    return (
        <>
            <Head>

            </Head>
            <PageTemplate>
                <main className='flex flex-col w-full'>
                    <section className='w-full lg:my-0 md:my-0 my-[8%]'>
                        <h1 className='text-gray-200 text-[3.5rem] w-full'>Trending on the community</h1>
                        <h4 className='text-gray-300 text-[1.5rem] my-[5%]'>Results: {allIcons?.length}</h4>
                    </section>

                    <section className={styles.iconsContainer} ref={scrollContainerRef}>
                        {allIcons?.map(icon => {
                            return (
                                <div key={icon.id} className='lg:my-[0] md:my-[0] my-[2%]'>
                                    <IconWrapper
                                        src={`https://icon-generator-project-haha.s3.ap-southeast-2.amazonaws.com/${icon.id}`}
                                        heading={icon.prompt || ''}
                                    />
                                </div>
                            )
                        })}
                    </section>

                    {isFetching && <div>Loading more icons...</div>}
                </main>
                <CloseButton />
            </PageTemplate>
        </>

    )
}

export default Community
