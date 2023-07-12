import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import styles from '../styles/dropDown.module.css'

type ItemType = {
    text: string,
    href: string
}

type DropdownProps = {
    items?: ItemType[],
    parent: string | ReactNode,
    children?: ReactNode,
}

// const hidden = 'absolute w-[2rem] h-[2rem] top-[12px] right-[8rem] rounded-full cursor-pointer';
// const show = 'w-[35rem] h-[35rem] rounded'

const Dropdown = (props: DropdownProps) => {

    const { items, parent, children } = props;

    const [clicked, setClicked] = useState(false);

    const handleClicked = () => {
        setClicked(!clicked)
    }

    return (
        <div className='relative'>
            <button
                className=''
                type='button'
                onClick={handleClicked}
            >
                {parent}
            </button>

            {/* Click to show */}
            <ul className={clicked ? [styles.dropDown, styles.visible].join(' ') : [styles.dropDown, styles.hidden].join(' ')}>

                {/* If items were provided */}
                {items && items.map((item, index) => {
                    return (
                        <Link href={item.href}>
                            <li
                                key={index}
                            >
                                {item.text}
                            </li>
                        </Link>
                    )
                })}
                {children}
            </ul>
        </div>

    )
}

export default Dropdown
