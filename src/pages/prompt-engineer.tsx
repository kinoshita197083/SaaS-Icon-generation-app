import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PromptEngineer: NextPage = () => {


    return (
        <div className='min-h-[100vh] p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>
            <h1 className='lg:text-6xl md:text-5xl text-4xl font-thin lg:mb-[8%] md:mb-[6%] animate-fadein'>Prompt Engineering</h1>

            <h3 className='lg:text-3xl md:text-3xl text-2xl my-[3%]'>Prompt Structure</h3>
            <p className='lg:text-[1rem]'>Generating images from prompts can be a complex task, and achieving high-quality results without proper assistance (such as our configurations) can be quite challenging. Particularly, when dealing with ambiguous prompts like 'a girl,' 'anime,' and so on.</p>
            <br />
            <p>After thousands of trials and certain amount of research, we have come to a conclusion that prompts structured as follows are more likely to yield good images:</p>

            <br />
            <p className='text-center lg:my-[3%] text-gray-600 text-[1.3rem]'>&#123;adjective&#125; &#123;emotion&#125; &#123;Subject&#125;, &#123;behavior&#125;, &#123;position&#125;, &#123;background&#125;</p>

            <p className='mt-[5%]'>Ideally, your prompt should include at least two components:</p>
            <ul className='my-[2%]'>
                <li>- A Subject</li>
                <li>- A Style</li>
            </ul>

            <p className='lg:mt-[8%] lg:mb-[3%]'>For ambiguous prompts (without: style, color, behaviour, posture, etc.)</p>

            <section className='flex gap-[2%]'>
                <Image
                    src={'/brad.jpg'}
                    alt={'Example images generated with ambiguous prompts'}
                    width={150}
                    height={220}
                    className='rounded'
                />
                <Image
                    src={'/brad.jpg'}
                    alt={'Example images generated with ambiguous prompts'}
                    width={150}
                    height={220}
                    className='rounded'
                />
            </section>


            <h2 className='lg:text-3xl md:text-3xl text-2xl my-[7%]'><FontAwesomeIcon icon={faLightbulb} className='text-[3rem] text-yellow-400 lg:mr-[2rem] md:mr-[1rem] mr-[1rem]' />Tips to increase your chance getting the best results</h2>

            <h3 className='text-2xl'>1. Choose a specific style</h3>
            <br />
            <p>We have provided some of the pre-config styles that have been tested and deemed as stable (relatively), please do at least pick one, if you want to have more freedom on that, do feel free to include your desired styles in the textfield. In that case, you may want to choose the 'default' style in the Style section to avoid unwanted 'crossover'.</p>

            <h3 className='text-2xl mt-[7%]'>2. Be specific, include as many little elements as you can</h3>
            <br />
            <p>When saying specific, background seems to be something people have often left behind. Background as one of the most important element of an image, it is strongly recommended to include at least some details, such as:</p>
            <p className='my-[3%] text-center'><em>&quot;An small inn locate at the foot of the mountain, bright shining sun hanging up on the sky&quot;</em></p>

            <h3 className='text-2xl lg:mt-[5%] md:mt-[5%] mt-[10%]'>3. Think about the emotions</h3>
            <br />
            <p>It really helps when you include emotions into the generation, AI are sometimes bad at drawing faces and turns out to be everything looks awesome, except the face.</p>
            <p>Good example would be like</p>

            <div className='flex items-center justify-center my-[2%]'>
                <Image
                    src={'/90s-a middle age asian man, sadly standing in the middle of the street.png'}
                    alt={'Example images generated with ambiguous prompts'}
                    width={350}
                    height={420}
                    className='rounded'
                />
            </div>

            <p className='text-center lg:my-[3%] md:my-[3%] mb-[10%]'>a middle age asian man, sadly standing in the middle of the street (Style - 90s)</p>

            <h3 className='text-2xl mt-[5%]'>4. Composition</h3>
            <br />
            <p>Long story short</p>
            <br />
            <ul>
                <li>Photo angles - &apos;a view of a man from behind&apos;</li>
                <li>Lighting - in the sum (outdoor)</li>
            </ul>

            <div className='flex items-center justify-center my-[2%]'>
                <Image
                    src={'/film-camera-style.png'}
                    alt={'Example images generated with ambiguous prompts'}
                    width={350}
                    height={420}
                    className='rounded'
                />
            </div>

            <div className='flex justify-center items-center mt-[8%]'>
                <Link href={'/recipe'}>
                    <button type='button' className='btn'>Check out the recipe</button>
                </Link>
            </div>
        </div>
    )
}

export default PromptEngineer
