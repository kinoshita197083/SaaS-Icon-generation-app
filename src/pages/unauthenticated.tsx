import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Unauthenticated: NextPage = () => {

    const { status } = useSession()
    const isLoggedIn = status === 'authenticated';

    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            try {
                void router.push('/')
            } catch (err) {
                console.log(err)
            }
        }
    }, [status])

    return (
        <main className='min-h-[100vh] bg-gray-600 flex items-center justify-center'>
            {
                isLoggedIn ? <button
                    className='btn'
                    onClick={() => { void router.push('/').catch(console.error) }}
                    type='button'>
                    Back to home
                </button> :

                    <button
                        className='btn'
                        onClick={() => { void signIn().catch(err => console.log(err)) }}
                        type='button'>
                        Sign in
                    </button>
            }
        </main>
    )
}

export default Unauthenticated
