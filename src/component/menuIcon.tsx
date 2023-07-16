import React from 'react'
import styles from '../styles/menuIcon.module.css'

type MenuIconProps = {
    clicked?: boolean,
    setClicked?: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuIcon = (props: MenuIconProps) => {

    const { clicked, setClicked } = props;

    // const [clicked, setClicked] = useState(false);

    return (
        <div role="Menu icon for menu display on mobile" className={styles.menuIcon} onClick={() => setClicked && setClicked(!clicked)}>
            <span className={clicked ? [styles.bar, styles.active].join(' ') : styles.bar} />
            <span className={clicked ? [styles.bar, styles.active].join(' ') : styles.bar} />
            <span className={clicked ? [styles.bar, styles.active].join(' ') : styles.bar} />
        </div>
    )
}

export default MenuIcon
