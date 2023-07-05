import styles from '../styles/collection.module.css'

type CollectionProps = {
    children: React.ReactNode,
    collectionName: string
}

const Collection = (props: CollectionProps) => {

    const { children, collectionName } = props;

    return (
        <>
            <div className={styles.collection}>
                <h3 className='absolute top-[10%] lg:top-[5%] left-[50%] translate-x-[-50%] text-[2rem] lg:text-[3rem] text-[white] '>{collectionName}</h3>
                {children}
            </div>
        </>

    )
}

export default Collection
