import { faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

type CarouselProps = {
    images: string[],
    downloadable?: boolean,
}

const Carousel = (props: CarouselProps) => {

    const { images, downloadable } = props;

    const [clicked, setClicked] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState('');

    return (
        <div className='relative flex w-full h-full'>

            {downloadable &&
                <>
                    <button
                        type='button'
                        className='absolute btn top-[5%] right-[10%] translate-x-[50%]'
                        onClick={() => setClicked(!clicked)}
                    >
                        <FontAwesomeIcon className='mr-[5%]' icon={faBars} />
                    </button>

                    <div className={[clicked ? 'visible opacity-[1] transition-all ease-in-out' : 'invisible opacity-0 transition-all', 'absolute top-[18%] right-[5%] lg:w-[10rem] p-[2%] bg-gray-700 rounded'].join(' ')}>
                        <a href={currentImage}
                            target='_blank'
                            download>
                            <button className='w-full mb-[2%] bg-gray-600 text-[white] rounded-[5px] transition-all'>Download</button>
                        </a>
                    </div>
                </>}

            {images.length > 1 && <>
                <button
                    className='absolute h-[3rem] w-[3rem] backdrop-blur rounded-full top-[50%] translate-y-[-50%]'
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <button
                    className='absolute h-[3rem] w-[3rem] backdrop-blur rounded-full top-[50%] right-0 translate-y-[-50%]'
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </>}

            {images.map((image, index) => {
                return (
                    <>
                        <img
                            key={index}
                            src={image}
                            alt='generated icon'
                            className='flex-screen'
                        />

                        <div className='absolute bg-gray-500 bottom-[5%] left-[50%] translate-x-[50%] flex'>
                            <span
                                className='block bg-gray-300 rounded-full'
                            />
                        </div>
                    </>
                )
            })}



        </div>
    )
}

export default Carousel
