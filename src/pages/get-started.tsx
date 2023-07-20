import { NextPage } from 'next'
import React from 'react'
import 'animate.css';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

const GetStarted: NextPage = () => {
    return (
        <div className='min-h-[100vh] p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>
            <h1 className='lg:text-6xl md:text-5xl text-4xl font-thin lg:mb-[8%] md:mb-[6%] mb-[15%] animate-fadein'>
                Get Started
            </h1>

            <h2 className='text-[1.3rem] font-thin mb-[2%] text-gray-500'>
                Looking for a
                <span className='text-[2rem] text-black'> Quick </span>
                and easy way to create stunning icons?
            </h2>
            <h2 className='text-[1.2rem] mb-[2%] ml-[6%] animate-fadein animate__flipInX'>
                Numerous images with a matter of seconds
            </h2>

            <br />
            <br />

            <h2 className='text-[1.3rem] font-thin mb-[2%] text-gray-500'>
                Desire high degree of
                <span className='text-[2rem] text-black'> Customisability </span>
                ?
            </h2>
            <h2 className='text-[1.2rem] mb-[2%] ml-[4%] animate-fadein animate__flipInX'>
                Not only styles, colors, but ... also your thoughts?
            </h2>
            <br />
            <br />

            <h2 className='text-[1.3rem] font-thin mb-[2%]'>
                Limited
                <span className='text-[2rem] text-black'> Budget </span>
                , or just for fun?</h2>
            <h2 className='text-[1.2rem] mb-[2%] ml-[2%] text-end animate-fadein animate__flipInX'>
                with affordable pricing...?
            </h2>

            <br />
            <br />
            <br />
            <h1 className='lg:text-6xl md:text-5xl text-4xl font-thin lg:mb-[8%] md:mb-[6%] mb-[15%] animate-fadein '>How it works?</h1>

            <section>
                <h2 className='text-[1.4rem] text-center mb-[2%] animate-fadein animate__flipInX'>
                    Fill out the generation form
                </h2>
                <Player
                    autoplay
                    loop
                    src="fillingForm.json"
                    style={{ height: '40%', width: '40%' }}
                >
                </Player>
                <br />
                <br />
                <br />
                <br />
                <h2 className='text-[1.4rem] text-center mb-[2%] animate-fadein animate__flipInX'>
                    Send it to our backend for processing
                </h2>
                <Player
                    autoplay
                    loop
                    src="fly.json"
                    style={{ height: '40%', width: '40%' }}
                >
                </Player>
                <h2 className='text-[1.4rem] text-center mb-[2%] animate-fadein animate__flipInX'>
                    AI Processing ...
                </h2>
                <Player
                    autoplay
                    loop
                    src="ai.json"
                    style={{ height: '40%', width: '40%' }}
                >
                </Player>
                <br />
                <h2 className='text-[1.4rem] text-center mb-[2%] animate-fadein animate__flipInX'>
                    Icon Generation Completed!
                </h2>
                <Player
                    autoplay
                    loop
                    src="tick.json"
                    style={{ height: '40%', width: '40%' }}
                >
                </Player>
                <br />
                <h2 className='text-[1.4rem] text-center mb-[2%] animate-fadein animate__flipInX'>
                    Sign in and Start Generating your Icon!
                </h2>
                <div className="flex justify-center items-center">
                    <Link className='mt-[5%]' href={'/generate'}>
                        <button className='btn'>
                            Generate
                        </button>
                    </Link>
                </div>

            </section>
        </div>
    )
}

export default GetStarted
