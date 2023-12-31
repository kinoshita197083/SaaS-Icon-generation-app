import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from '../styles/carousel.module.css';
import Download from './download';
import Image from 'next/image';

type CarouselProps = {
    images: string[],
    downloadable?: boolean,
    autoplay?: boolean,
}

const Carousel = (props: CarouselProps) => {

    const { images, downloadable, autoplay } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clicked, setClicked] = useState(false);

    const currentImage = images[currentIndex];

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => nextImage(), 5000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [autoplay, currentIndex])

    const handleClick = () => {
        setClicked(prevClicked => !prevClicked);
        // document.body.style.overflow = 'hidden';
    }

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
        <div className='relative w-full h-full overflow-hidden rounded-[inherit]'>

            {/* Download dropdown */}
            {downloadable &&
                <>
                    <Download
                        src={currentImage || '/jene.jpg'}
                    />
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
                    <div key={index}
                        className={currentIndex === index ? [styles.slide, styles.active].join(' ') : [styles.slide].join(' ')}
                        onClick={handleClick}
                    >
                        <Image
                            key={index + 5}
                            width={800}
                            height={800}
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

            <div className='fixed inset-0 blur-dark flex justify-center items-center z-[99]'
                style={{ display: clicked ? 'block' : 'none' }}
                onClick={handleClick}
            >
                <Image
                    src={currentImage}
                    fill
                    alt='selected image'
                    className='object-contain'
                    placeholder='empty'
                />
            </div>

        </div>
    )
}

export default Carousel
