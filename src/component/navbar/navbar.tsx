import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './navbar.module.css';
import { useEffect, useState } from 'react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

type NavItem = {
    text: string,
    type: string
}

type NavbarProps = {
    logo?: string,
    projectName?: string,
    navbarItems: NavItem[]
}

const Navbar = (props: NavbarProps) => {

    const { projectName, navbarItems } = props;

    const [click, setClick] = useState(false);
    const [scroll, setScrolled] = useState(false);

    const handleClick = () => {
        setClick(!click);
    }

    const handleScrolled = () => {
        if (window.scrollY >= 10) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrolled)

        return () => {
            window.removeEventListener('scroll', handleScrolled)
        }
    }, [])

    return (
        <header className={scroll ? [styles.navContainer, styles.scrolled].join(' ') : styles.navContainer}>
            <nav className={styles.navbar}>
                <div className={styles.menuIcon} onClick={handleClick}>
                    <span className={click ? [styles.bar, styles.active].join(' ') : styles.bar} />
                    <span className={click ? [styles.bar, styles.active].join(' ') : styles.bar} />
                    <span className={click ? [styles.bar, styles.active].join(' ') : styles.bar} />
                </div>
                <div className={[styles.logoGroup, 'font-semibold'].join(' ')}>
                    <FontAwesomeIcon icon={faGhost} size='2x' className={styles.navLogo} />
                    <h2 className='text-[1.6rem]'>{projectName}</h2>
                </div>
                <ul className={click ? styles.navMenu : [styles.navMenu, styles.closed].join(' ')}>
                    {navbarItems.map((item, index) => {
                        return (<li key={index} className={item.type === 'button' ? [styles.navBtn, styles.navItem].join(' ') : styles.navItem}>{item.text}</li>)
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
