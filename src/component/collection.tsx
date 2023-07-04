import styles from '../styles/collection.module.css'

type CollectionProps = {
    children: React.ReactNode,
}

const Collection = (props: CollectionProps) => {

    const { children } = props;

    return (
        <div className={styles.collection}>
            {children}
        </div>
    )
}

export default Collection
