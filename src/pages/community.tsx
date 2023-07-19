import { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { api } from '~/utils/api'
import PageTemplate from '~/component/page/pageTemplate'
import CloseButton from '~/component/closeButton'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import { env } from '~/env.mjs'
import Image from 'next/image'
import IconShowcase from '~/component/iconShowcase'
import IconWrapper from '~/component/iconWrapper'
import Popup from '~/component/popup'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Community: NextPage = () => {

    const [clicked, setClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        src: '/jene.jpg',
        heading: '',
    });

    const handleClick = (image: string, prompt: string) => {
        setClicked(true);
        updateSelectedImage('src', image);
        updateSelectedImage('heading', prompt)
    }

    const updateSelectedImage = (key: string, value: string) => {
        setSelectedImage(prev => ({
            ...prev,
            [key]: value
        }))
    }

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
                <div className='flex flex-col w-full lg:h-[40rem] md:h-[40rem] h-[72vh] relative'>
                    <section className='w-full lg:mt-[0%] mt-[5%]'>
                        <h1 className='text-gray-200 lg:text-[3.5rem] md:text-[3rem] text-[1.5rem] w-full'>Trending on the community</h1>
                        <h4 className='text-gray-300 text-[1rem] my-[2%]'>Results: {allIcons?.length}</h4>
                    </section>

                    <div>
                        <IconShowcase>
                            {allIcons?.map((icon, index) => {

                                const iconSrc = `${env.NEXT_PUBLIC_BUCKET}${icon.id}`;
                                if (allIcons.length === index + 1) {
                                    return (
                                        <div key={icon.id} ref={scrollContainerRef} className='m-0 flex justify-center'>
                                            <IconWrapper
                                                key={icon.id}
                                                iconId={icon.id}
                                                iconSrc={iconSrc}
                                                handleClick={() => handleClick(iconSrc, icon.prompt)}
                                            />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <IconWrapper
                                            key={icon.id}
                                            iconId={icon.id}
                                            iconSrc={iconSrc}
                                            handleClick={() => handleClick(iconSrc, icon.prompt)}
                                        />
                                    )
                                }
                            })}
                        </IconShowcase>
                    </div>

                    {/* Loading spinner */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isFetching}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    {/* Popup modal */}
                    <Popup
                        state={clicked}
                        setState={setClicked}
                        textContent={selectedImage.heading}>
                        <Image
                            src={selectedImage.src}
                            width={350}
                            height={350}
                            alt='selected image'
                            className='rounded-[inherit] object-cover w-[100%] mx-auto'
                            priority={true}
                        />
                    </Popup>

                </div>
                <CloseButton />
            </PageTemplate>
        </>

    )
}

export default Community
