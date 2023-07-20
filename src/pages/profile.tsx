import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import PageTemplate from '~/component/page/pageTemplate'
import { api } from '~/utils/api'
import { requireAuth } from '~/utils/requireAuth'
import IconWrapper from '~/component/iconWrapper'
import CloseButton from '~/component/closeButton'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import Download from '~/component/download'
import { env } from '~/env.mjs'
import { GetServerSidePropsContext } from 'next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconShowcase from '~/component/iconShowcase'
import Popup from '~/component/popup'

const Profile: NextPage = () => {

    const limit = 50;

    const [clicked, setClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        src: '',
        heading: '',
        loading: false
    });

    const handleClick = (image: string, prompt: string) => {
        updateSelectedImage('src', '');
        selectedImage.src !== image && updateSelectedImage('loading', true)
        updateSelectedImage('src', image);
        updateSelectedImage('heading', prompt)
        setClicked(true);
    }

    const updateSelectedImage = (key: string, value: string | boolean) => {
        setSelectedImage(prev => ({
            ...prev,
            [key]: value
        }))
    }

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

    useInfiniteScroll(scrollContainerRef, hasNextPage, isFetching, void fetchNextPage)

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
                <div className='w-full lg:h-[35rem] md:h-[35rem] h-[45rem] flex flex-col lg:flex-row md:flex-row gap-0 lg:mt-0 md:mt-0 mt-[8%]'>
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
                    <div className='lg:w-[70%] p-[1%] overflow-auto'>
                        <IconShowcase>
                            {icons.map((icon, index) => {

                                const iconSrc = `${env.NEXT_PUBLIC_BUCKET}${icon.id}`
                                if (icons.length === index + 1) {
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
                                }
                                return (
                                    <IconWrapper
                                        key={icon.id}
                                        iconId={icon.id}
                                        iconSrc={iconSrc}
                                        handleClick={() => handleClick(iconSrc, icon.prompt)}
                                    />
                                )
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
                        isLoading={selectedImage.loading}
                        textContent={selectedImage.heading}>
                        <div className={['rounded-[inherit] relative'].join(' ')}>
                            <Image
                                src={selectedImage.src}
                                width={350}
                                height={350}
                                alt='selected image'
                                className='rounded-[inherit] object-cover w-[100%] mx-auto'
                                priority={true}
                                onLoad={() => updateSelectedImage('loading', false)}
                            />
                        </div>

                        <Download
                            src={selectedImage.src}
                        />
                    </Popup>

                </div>

                <CloseButton />
            </PageTemplate>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return requireAuth(context, ({ session }) => {
        return {
            props: { session }
        }
    })
}

export default Profile