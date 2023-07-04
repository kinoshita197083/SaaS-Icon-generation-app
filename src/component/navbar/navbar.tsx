import styles from './navbar.module.css';
import { useEffect, useState } from 'react';

type NavbarProps = {
    logo?: string,
    projectName?: string,
    navbarItems: string[]
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
                <div className='logoGroup'>
                    {/* <img className='nav-logo'
                        src={logo}
                    /> */}
                    <i className="fa-solid fa-ghost navLogo"></i>
                    <h2 className='text-[1.6rem]'>{projectName}</h2>
                </div>
                <ul className={click ? styles.navMenu : [styles.navMenu, styles.closed].join(' ')}>
                    {navbarItems.map((item, index) => {
                        return (<li key={index} className={styles.navItem}>{item}</li>)
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
