import Image from 'next/image';

const Poster = () => {

    return (
        <section className='relative mx-auto lg:my-[4%] md:my-[2%] mt-[5%] w-full lg:max-w-[80%] md:max-w-[80%] overflow-hidden'>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-violet-400 to-90% bg-no-repeat bg-cover rounded-[25px] lg:rounded-[45px]">
                <div className="relative flex flex-col lg:flex-row gap-[5%] blur-dark h-[33rem] md:min-h-[35rem] lg:min-h-[50rem] overflow-hidden animate-fadein rounded-[inherit]">
                    <Image
                        src={'/thinking.png'}
                        width={900}
                        height={900}
                        priority={true}
                        alt='Landing page hero image'
                        className='absolute grayscale-[50] md:top-[-8%] lg:top-[-220px]'
                    />

                    <h2 className='text-gray-100 text-3xl lg:text-5xl md:text-5xl ml-[5%] mt-[5%] z-[+1]'>
                        Custom Colors<br />
                        <span className='lg:text-3xl md:text-3xl text-2xl'>
                            Unique Style
                            <br />
                            Limitness Possibilities
                        </span>
                    </h2>

                    <div className='absolute w-full shadow-[0px_-40px_27px_rgba(0,0,0,0.3)] bottom-0 lg:h-[10rem] md:h-[8rem] h-[6.5rem] bg-[rgba(0,0,0,0.3)] p-[3%] pt-[0] pl-[5%]'>
                        <h2 className='text-gray-100 text-[1.3rem] md:text-4xl lg:text-4xl'>
                            Customize AI Icon Generation
                        </h2>
                        <p className='text-gray-100 text-[0.9rem] lg:mt-[3%] mt-[2%]'>
                            Save valuable time as our advanced algorithms handle the heavy lifting
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Poster
