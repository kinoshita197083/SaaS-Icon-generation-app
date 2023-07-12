import { faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from '../styles/carousel.module.css';

type CarouselProps = {
    images: string[],
    downloadable?: boolean,
    autoplay?: boolean,
}

const Carousel = (props: CarouselProps) => {

    const { images, downloadable, autoplay } = props;

    const [clicked, setClicked] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentImage = images[currentIndex];

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => nextImage(), 5000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [autoplay])

    const nextImage = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }

    const previousImage = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    }

    const selectImage = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        <div className='relative w-full h-full overflow-auto rounded-[inherit]'>

            {/* Download dropdown */}
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

            {/* Previous & Next button only show up when more than 1 image is provided */}
            {images.length > 1 && <>
                <button
                    onClick={previousImage}
                    className='absolute z-[1] h-[3rem] w-[3rem] backdrop-blur rounded-full top-[50%] translate-y-[-50%]'
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <button
                    onClick={nextImage}
                    className='absolute z-[1] h-[3rem] w-[3rem] backdrop-blur rounded-full top-[50%] right-0 translate-y-[-50%]'
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </>}

            {/* Carousel */}
            {images.map((image, index) => {
                return (
                    <div className={currentIndex === index ? [styles.slide, styles.active].join(' ') : [styles.slide].join(' ')}>
                        <img
                            key={index + 5}
                            src={image}
                            alt='carousel image'
                            className={styles.carouselImage}
                        />
                    </div>
                )
            })}

            {/* Little dot shape pagination */}
            <span className='absolute w-[5rem] h-[1rem] bottom-[5%] left-[50%] translate-x-[-50%] flex items-center justify-center'>
                {images.map((__, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => selectImage(index)}
                            className={['block rounded-full w-[10px] h-[10px] mx-[5%]', currentIndex === index ? 'bg-white' : 'bg-[gray]'].join(' ')}
                        />
                    )
                })}
            </span>



        </div>
    )
}

export default Carousel
