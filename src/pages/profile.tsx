import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import PageTemplate from '~/component/page/pageTemplate'
import { api } from '~/utils/api'
import { requireAuth } from '~/utils/requireAuth'
import styles from '../styles/profile.module.css'
import IconWrapper from '~/component/iconWrapper'
import CloseButton from '~/component/closeButton'

const Profile: NextPage = () => {

    const limit = 30;
    const scrollContainerRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetching } = api.icons.getIcons.useInfiniteQuery(
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

    const icons = data?.pages.flatMap((page) => page.icons) || [];

    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>Icon Generation</title>
                <meta name='ai-generation' content='ai powered icon generation' />
                {/* <link rel="icon" href="" /> */}
            </Head>

            <PageTemplate>
                <main className='w-full max-h-[30rem] flex flex-col lg:flex-row md:flex-row gap-0'>
                    <section
                        role='profile-tab'
                        className='lg:w-[30%] md:w-[30%] w-[full] p-[5%] bg-black rounded-bl-[25px] rounded-tl-[25px]'
                    >
                        <Image
                            src={session?.user.image || '/ape.jpg'}
                            alt='user profile picture'
                            width='100'
                            height='100'
                            className='rounded-full mx-auto my-[5%]'
                        />

                        <div role='profile info'
                            className='flex flex-col'
                        >
                            <h1 className='text-white mx-auto mb-[5%] text-center'>
                                {session?.user.name || 'Imaginor'}
                            </h1>

                            <h2 className='text-white text-[1rem] md:text-[0.7rem] lg:text-[0.7rem] w-full mx-auto text-center'>
                                UserID: {session?.user.id}
                            </h2>
                        </div>


                        <hr className='my-[8%]' />
                    </section>

                    {/* All generated icons display section */}
                    <section
                        role='icons-display'
                        className='lg:w-[70%] md:w-[70%] w-full overflow-auto'
                        ref={scrollContainerRef}
                    >
                        <ul className={styles.iconsContainer}>
                            {icons.map(icon => {
                                return (
                                    <IconWrapper
                                        src={`https://icon-generator-project-haha.s3.ap-southeast-2.amazonaws.com/${icon.id}`}
                                        heading={icon.prompt || 'Heading mising'}
                                        content=''
                                    />
                                )
                            })}

                        </ul>
                    </section>
                </main>

                <CloseButton />
            </PageTemplate>
        </>
    )
}

export async function getServerSideProps(context: any) {
    return requireAuth(context, ({ session }: any) => {
        return {
            props: { session }
        }
    })
}

export default Profile