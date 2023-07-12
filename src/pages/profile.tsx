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
                <main className='w-full flex gap-0'>
                    <section
                        role='profile-tab'
                        className='w-[30%] p-[5%]'
                    >
                        <Image
                            src={session?.user.image || ''}
                            alt='user profile picture'
                            width='100'
                            height='100'
                            className='rounded-full mx-auto my-[5%]'
                        />
                        <h1
                            className='text-white mx-auto text-center'
                        >
                            {session?.user.name}
                        </h1>

                        <hr className='my-[5%]' />
                    </section>

                    <section
                        role='icons-display'
                        className='w-[70%]'
                    >
                        <ul className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 p-[5%] overflow-scroll'>
                            {icons.data?.icons.map(icon => {
                                return (
                                    <li
                                        key={icon.id}
                                        className='bg-gray-600 p-[5%] rounded min-w-[10rem]'
                                    >
                                        <Image
                                            src={`https://icon-generator-project-haha.s3.ap-southeast-2.amazonaws.com/${icon.id}`}
                                            className='w-full'
                                            width='100'
                                            height='100'
                                            alt='previously generated icon'
                                        />
                                        <h3
                                            className='text-gray-100 text-center'
                                        >
                                            {icon.prompt}
                                        </h3>
                                    </li>
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