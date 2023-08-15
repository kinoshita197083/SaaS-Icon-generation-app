import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import PageTemplate from '~/component/page/pageTemplate'
import { api } from '~/utils/api'
import IconWrapper from '~/component/iconWrapper'
import CloseButton from '~/component/closeButton'
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll'
import Download from '~/component/download'
import { env } from '~/env.mjs'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconShowcase from '~/component/iconShowcase'
import Popup from '~/component/popup'
import CustomHead from '~/component/head'


const Profile: NextPage = () => {

    //Icons display container: use for infinite scroll
    const scrollContainerRef = useRef(null);

    const { data: session, status } = useSession()
    const isLoggedIn = status === 'authenticated';

    //Delete Icon
    const deleteInstance = api.icons.deleteIcon.useMutation();

    //How many icons to fetch for the initial render
    const limit = 100;

    //Pop up: selected icon
    const [clicked, setClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        src: '',
        heading: '',
        loading: false,
    });

    const handleClick = (image: string, prompt: string) => {
        updateSelectedImage('src', '');
        selectedImage.src !== image && updateSelectedImage('loading', true)
        updateSelectedImage('src', image);
        updateSelectedImage('heading', prompt)
        setClicked(true);
    }

    const handleDelete = async () => {
        const iconId = selectedImage.src.replace(env.NEXT_PUBLIC_BUCKET, '');
        try {
            updateSelectedImage('loading', true);
            await deleteInstance.mutateAsync({
                iconId: iconId
            })
            setClicked(false);
            updateSelectedImage('loading', false);
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const updateSelectedImage = (key: string, value: string | boolean) => {
        setSelectedImage(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const { data, fetchNextPage, hasNextPage, isFetching, refetch } = api.icons.getIcons.useInfiniteQuery(
        {
            limit: limit,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    //Setup inifinite scrolling
    useInfiniteScroll(scrollContainerRef, hasNextPage, isFetching, fetchNextPage)

    //All Icons
    const icons = data?.pages.flatMap((page) => page.icons) || [];

    return (
        <>
            <CustomHead
                title={`${session?.user.name}'s Profile - Imagin`}
                description={`View ${session?.user.name}'s profile on our website. Get to know more about ${session?.user.name}'s interests and activities.`}
                follow
            />

            {isLoggedIn ?
                <PageTemplate>
                    <div className='w-full lg:h-[35rem] md:h-[35rem] h-[45rem] flex flex-col lg:flex-row md:flex-row gap-0 lg:mt-0 md:mt-0 mt-[8%]'>
                        <section
                            role='profile-tab'
                            className='lg:w-[30%] md:w-[30%] w-[full] p-[5%] bg-black lg:rounded-bl-[25px] rounded-tl-[25px] lg:rounded-tr-[0px] md:rounded-tr-[0px] rounded-tr-[25px] md:rounded-bl-[25px]'
                        >
                            <Image
                                src={session?.user.image || '/user.jpg'}
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

                            <h2 className='text-gray-100'>Results: {icons.length}</h2>
                        </section>

                        {/* All generated icons display section */}
                        <div className='lg:w-[70%] md:w-[70%] p-[1%] h-[35rem] bg-black lg:rounded-tr-[25px] md:rounded-tr-[25px] rounded-br-[25px] lg:rounded-bl-[0px] md:rounded-bl-[0px] rounded-bl-[25px]'>
                            <IconShowcase>
                                {icons.map((icon, index) => {
                                    const iconSrc = `${env.NEXT_PUBLIC_BUCKET}${icon.id}`
                                    if (icons.length === index + 1) {
                                        return (
                                            <div key={icon.id} ref={scrollContainerRef} className='mx-[auto] h-[fit-content]'>
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
                                })
                                }
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
                            >
                                <button
                                    onClick={handleDelete}
                                    className='w-full py-[5%] lg:px-[2%] lg:py-[6%] lg:p-[12%] border-b-[1px] border-b-gray-400 bg-gray-700 text-[white] hover:bg-gray-500 rounded-bl-[5px] rounded-br-[5px] transition-all'>
                                    Delete
                                </button>
                            </Download>
                        </Popup>
                    </div>

                    <CloseButton />
                </PageTemplate>
                :
                <div className='flex min-h-[100vh] justify-center items-center'>
                    <button className='btn'
                        type='button'
                        onClick={() => { void signIn().catch(err => console.log(err)) }}
                    >
                        Sign in
                    </button>
                </div>
            }
        </>
    )
}

export default Profile