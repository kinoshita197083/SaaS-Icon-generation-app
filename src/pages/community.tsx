import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import IconWrapper from '~/component/iconWrapper'
import { api } from '~/utils/api'
import styles from '../styles/community.module.css'

const Community: NextPage = () => {

    const [page, setPage] = useState(0);

    const { data, fetchNextPage } = api.icons.getAllUsersIcons.useInfiniteQuery(
        {
            limit: 4,
            //   categoryId: category?.id, // this is optional - remember
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const handleFetchNextPage = () => {
        fetchNextPage();
        setPage((prev) => prev + 1);
    };

    const handleFetchPreviousPage = () => {
        setPage((prev) => prev - 1);
    };

    // data will be split in pages
    const allIcons = data?.pages[page]?.iconIds;

    console.log(allIcons)

    return (
        <>
            <Head>

            </Head>
            <main className='p-[8%] bg-gray-100 flex flex-col'>
                <section className='w-full lg:my-0 md:my-0 my-[8%]'>
                    <h1 className='text-gray-800 text-[3.5rem] w-full'>Trending on the community</h1>
                    <h4 className='text-gray-400 text-[1.5rem] my-[5%]'>Results Found: {allIcons?.length}</h4>
                </section>

                <section className={styles.iconsContainer}>
                    {allIcons?.map(icon => {
                        return (
                            <div className='lg:my-[0] md:my-[0] my-[2%]'>
                                <IconWrapper
                                    src={`https://icon-generator-project-haha.s3.ap-southeast-2.amazonaws.com/${icon.id}`}
                                    heading={icon.prompt || ''}
                                />
                            </div>
                        )
                    })}
                </section>

                <button className='btn mx-auto mt-[8%]' onClick={handleFetchNextPage}>Load more</button>

            </main>
        </>

    )
}

export default Community
