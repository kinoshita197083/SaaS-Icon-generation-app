import React, { type ReactNode } from 'react'
import styles from '../styles/iconShowcase.module.css'

type IconShowcaseProps = {
    children: ReactNode,
}

const IconShowcase = (props: IconShowcaseProps) => {

    const { children } = props;

    return (
        <section className={styles.gridContainer}>
            {children}
        </section>
    )
}

export default IconShowcase
