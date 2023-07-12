import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './navbar.module.css';
import { useEffect, useRef, useState } from 'react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import Image from "next/image";
import Dropdown from "../dropDown";
import { useRouter } from "next/router";
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
    const router = useRouter();

    // const dropDownLinkStyle = "w-full min-h-[3rem] bg-gray-600 text-gray-200 flex items-center grow justify-center cursor-pointer hover:bg-gray-500 transition-all";

    const handleBuyCredits = () => {
        try {
            buyCredits();
        } catch (err) {
            console.log(err);
        }
    }

    const { projectName } = props;

    const [click, setClick] = useState(false);
    const [subMenuClicked, setSubMenuClicked] = useState(false);
    const [scroll, setScrolled] = useState(false);

    const triggerDropDownRef = useRef<HTMLImageElement>(null);
    const dropDownRef = useRef<HTMLUListElement>(null);

    const { data: session, status } = useSession()
    const isLoggedIn = status === 'authenticated';
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

    const closeDropDown = (e: MouseEvent) => {
        if (dropDownRef.current && triggerDropDownRef.current) {
            !triggerDropDownRef.current.contains(e.target as Node) ? setSubMenuClicked(false) : null;
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrolled);
        document.addEventListener('click', closeDropDown);

        return () => {
            window.removeEventListener('scroll', handleScrolled);
            document.removeEventListener('click', closeDropDown)
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

                    {!isLoggedIn ?
                        <button
                            className={[styles.navBtn, styles.navItem].join(' ')}
                            onClick={() => { void signIn().catch(console.error) }}>
                            Sign in
                        </button>
                        :
                        <>
                            <li className='w-full min-h-[3rem] flex items-center justify-center lg:w-[6rem] text-gray-400 lg:text-center'>
                                Credits: {user.data?.credits}
                            </li>

                            <Image src={session?.user.image || ''}
                                ref={triggerDropDownRef}
                                alt='profile picture'
                                width='35'
                                height='35'
                                className="rounded-full cursor-pointer block md:block lg:block"
                                onClick={() => setSubMenuClicked(!subMenuClicked)}
                            />

                            <ul ref={dropDownRef} className={subMenuClicked ? styles.subNavMenu : [styles.subNavMenu, styles.closed].join(' ')}>
                                <li onClick={() => router.push('/profile')}
                                    className={styles.navItem}>
                                    Profile
                                </li>

                                <li onClick={handleBuyCredits}
                                    className={styles.navItem}>
                                    Buy Credits
                                </li>

                                <li className={styles.navItem}
                                    onClick={() => { void signOut().catch(console.error) }}>
                                    Sign out
                                </li>
                            </ul>
                        </>}
                </ul>
            </nav >
        </header >
    )
}

export default Navbar
