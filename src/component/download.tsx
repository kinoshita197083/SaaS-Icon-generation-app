import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from './menuIcon';

type DownloadProps = {
    src: string,
}

const Download = ({ src }: DownloadProps) => {

    const [clicked, setClicked] = useState(false);
    const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('click', closeDropDown);

        return () => {
            document.removeEventListener('click', closeDropDown);
        }
    }, [])

    const closeDropDown = (e: MouseEvent) => {
        if (dropdownRef.current && dropdownTriggerRef.current) {
            !dropdownTriggerRef.current.contains(e.target as Node) ? setClicked(false) : null;
        }
    }

    return (
        <div className=''>
            <button
                ref={dropdownTriggerRef}
                type='button'
                className='absolute top-[5%] right-[10%] translate-x-[50%] z-[5] p-[2%] rounded backdrop-blur'
                onClick={() => setClicked(!clicked)}
            >
                {/* <FontAwesomeIcon className='mr-[5%]' icon={faBars} /> */}
                <MenuIcon
                    clicked={clicked}
                    setClicked={setClicked}
                />
            </button>

            <div ref={dropdownRef}
                className={[clicked ? 'visible opacity-[1] transition-all ease-in-out' : 'invisible opacity-0 transition-all', 'z-[5] absolute top-[16%] md:top-[14%] lg:top-[18%] right-[5%] lg:w-[10rem] p-[2%] bg-gray-700 rounded'].join(' ')}>
                <a href={src}
                    target='_blank'
                    download>
                    <button className='w-full mb-[2%] bg-gray-600 text-[white] rounded-[5px] transition-all'>Download</button>
                </a>
            </div>
        </div>
    )
}

export default Download
