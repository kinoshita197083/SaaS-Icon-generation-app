import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PageTemplate from '~/component/page/pageTemplate'
import { api } from '~/utils/api'
import { requireAuth } from '~/utils/requireAuth'
import styles from '../styles/profile.module.css'
import ReadMore from '~/component/readMore'
import IconWrapper from '~/component/iconWrapper'

const Profile: NextPage = () => {

    const icons = api.icons.getIcons.useQuery();
    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>Icon Generation</title>
                <meta name='ai-generation' content='ai powered icon generation' />
                {/* <link rel="icon" href="" /> */}
            </Head>

            <PageTemplate>
                <main className='w-full flex flex-col lg:flex-row md:flex-row gap-0'>
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
                        className='lg:w-[70%] md:w-[70%] w-full'
                    >
                        <ul className={styles.iconsContainer}>
                            {icons.data?.icons.map(icon => {
                                return (
                                    <IconWrapper
                                        src={`https://icon-generator-project-haha.s3.ap-southeast-2.amazonaws.com/${icon.id}`}
                                        heading={icon.prompt || 'Heading mising'}
                                        content='hey hey hey hey asd sad a sd asd a da sd as da s as d asd a sd asd a d as da'
                                    />
                                )
                            })}

                        </ul>
                    </section>
                </main>

                <Link href='/'>
                    <span className="absolute aspect-square bg-red-500 w-[1.5rem] rounded-full text-transparent hover:text-gray-700 flex justify-center items-center cursor-pointer top-[1%] right-[3%] lg:top-[3%]"><FontAwesomeIcon icon={faXmark} /></span>
                </Link>
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