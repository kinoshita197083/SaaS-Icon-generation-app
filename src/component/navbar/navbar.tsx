import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './navbar.module.css';
import { useEffect, useState } from 'react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";
{/* <script src="stripe.js"></script> */ }

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

    const { buyCredits } = useBuyCredits();

    const handleBuyCredits = () => {
        try {
            buyCredits();
        } catch (err) {
            console.log(err);
        }
    }

    const { projectName, navbarItems } = props;

    const [click, setClick] = useState(false);
    const [scroll, setScrolled] = useState(false);

    const session = useSession();
    const isLoggedIn = !!session.data;
    const user = api.user.getUser.useQuery();

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
                <Link href={'/'}>
                    <div className={[styles.logoGroup, 'font-semibold'].join(' ')}>
                        <FontAwesomeIcon icon={faGhost} size='2x' className={styles.navLogo} />
                        <h2 className='text-[1.6rem]'>{projectName}</h2>
                    </div>
                </Link>
                <ul className={click ? styles.navMenu : [styles.navMenu, styles.closed].join(' ')}>

                    {navbarItems.map((item, index) => {
                        return (
                            !isLoggedIn ?
                                <button
                                    key={index}
                                    className={item.type === 'auth' ? [styles.navBtn, styles.navItem].join(' ') : styles.navItem}
                                    onClick={() => { void signIn().catch(console.error) }}>
                                    {item.text}
                                </button>
                                :
                                <div className="flex" key={index + 1}>
                                    <li className={styles.navItem}>Credits: {user.data?.credits}</li >
                                    < button
                                        key={index}
                                        className={[styles.navBtn, styles.navItem, 'ml-[1rem]'].join(' ')}
                                        onClick={() => { void signOut().catch(console.error) }}>
                                        Sign out
                                    </button>

                                    <button onClick={handleBuyCredits}
                                        className="btn">
                                        Buy Credits
                                    </button>

                                </div>
                        )
                    })}
                </ul>
            </nav>
        </header >
    )
}

export default Navbar
