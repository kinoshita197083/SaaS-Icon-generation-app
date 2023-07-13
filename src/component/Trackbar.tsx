import styles from '../styles/trackbar.module.css'

type TrackbarProps = {
    items: any[],
    currentSlide: number,
}

const Trackbar = (props: TrackbarProps) => {

    const { items, currentSlide } = props;

    return (
        <nav className={styles.trackbar}>
            {items.map((__, index) => {
                return (
                    <div key={index} className={currentSlide === index ? styles.dot : [styles.dot, styles.inactived].join(' ')} />
                )
            })}
        </nav>
    )
}

export default Trackbar
