import styles from '../styles/collection.module.css'

type CollectionProps = {
    children: React.ReactNode,
    collectionName?: string,
    blur?: string,
    darkness?: boolean,
    flex?: boolean,
    padding?: string,
    margin?: string,
    overflow?: string,
    rounded?: string,
    height?: string,
}

const Collection = (props: CollectionProps) => {

    const { children, collectionName, blur, darkness, flex, padding, margin, overflow, rounded, height } = props;

    const collectionStyle = {
        backgroundColor: darkness ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: `blur(${blur})`,
        display: flex ? 'flex' : '',
        flexDirection: flex ? 'column' : '',
        padding: padding,
        margin: margin,
        overflow: overflow,
        borderRadius: rounded,
        height: height
    }

    return (
        <>
            <div className={styles.collection} style={collectionStyle}>
                <h3 className='absolute top-[10%] lg:top-[5%] left-[50%] translate-x-[-50%] text-[2rem] lg:text-[3rem] text-[white] '>{collectionName}</h3>
                {children}
            </div>
        </>

    )
}

export default Collection
