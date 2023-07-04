import { ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
    children?: ReactNode,
    heading?: string,
    paragraph: string
}

const Card = (props: CardProps) => {

    const { heading, paragraph } = props;

    return (
        <article className={styles.card}>
            <h3>{props.children}</h3>
            <h3>{heading}</h3>
            <p>{paragraph}</p>
        </article>
    )
}

export default Card
