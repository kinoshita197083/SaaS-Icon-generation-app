import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react'

type PopupProps = {
    children?: ReactNode,
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading?: boolean,
    textContent: string,
}

const Popup = (props: PopupProps) => {

    const { children, state, setState, isLoading, textContent } = props;

    return (
        <div
            className={[state ? 'transition-transform fixed rounded-[35px] blur-dark inset-0 bg-black lg:w-[25rem] md:w-[25rem] w-[80%] lg:h-[30rem] md:h-[28rem] h-[25rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:p-[1%] md:p-[2%] p-[4%] duration-500 ease-in-out' : 'fixed top-[300%] left-[50%] translate-x-[-50%] w-[25rem] h-[30rem] transition-all opacity-0 duration-1000'].join(' ')}
        >
            {children}
            <div role='prompt-container' className='lg:h-[15%] h-[20%] overflow-auto'>
                <h2 className='text-gray-100 mx-auto text-center mt-[5%] md:mt-[2%] text-[1.2rem]'>
                    {textContent}
                </h2>
            </div>

            <span
                onClick={() => {
                    setState(false);
                }}
                className="absolute aspect-square bg-red-500 opacity-[75%] lg:w-[1.5rem] md:w-[1.5rem] w-[2rem] rounded-full text-transparent hover:text-gray-700 flex justify-center items-center cursor-pointer bottom-[6%] right-[8%] lg:top-[6%] lg:left-[6%] md:top-[6%] md:left-[6%]">
                <FontAwesomeIcon icon={faXmark} />
            </span>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading || false}
                className='rounded-[inherit]'
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Popup
