import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/navbar.module.css'
import { useEffect, useRef, useState } from 'react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import Image from "next/image";
import { useRouter } from "next/router";
import MenuIcon from "./menuIcon";
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

    const { projectName } = props;

    const [click, setClick] = useState(false);
    const [subMenuClicked, setSubMenuClicked] = useState(false);
    const [scroll, setScrolled] = useState(false);

    const triggerDropDownRef = useRef<HTMLLIElement>(null);
    const dropDownRef = useRef<HTMLUListElement>(null);
    const navbarRef = useRef<HTMLHeadElement>(null);

    const { data: session, status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const user = api.user.getUser.useQuery();

    const { buyCredits } = useBuyCredits();
    const router = useRouter();

    const handleBuyCredits = () => {
        try {
            buyCredits();
        } catch (err) {
            console.log(err);
        }
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

    const closeMobileNavMenu = (e: MouseEvent) => {
        if (navbarRef.current) {
            !navbarRef.current.contains(e.target as Node) ? setClick(false) : null;
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrolled);
        document.addEventListener('click', closeDropDown);
        document.addEventListener('click', closeMobileNavMenu)

        return () => {
            window.removeEventListener('scroll', handleScrolled);
            document.removeEventListener('click', closeDropDown)
            document.removeEventListener('click', closeMobileNavMenu)
        }
    }, [])

    return (
        <header ref={navbarRef} className={scroll ? [styles.navContainer, styles.scrolled].join(' ') : styles.navContainer}>
            <nav className={styles.navbar}>

                {/* Menu Icon for mobile */}
                <div className={styles.menuIcon}>
                    <MenuIcon
                        clicked={click}
                        setClicked={setClick}
                    />
                </div>

                {/* Logo Group */}
                <Link href={'/'}>
                    <div className={[styles.logoGroup, 'font-semibold'].join(' ')}>
                        <FontAwesomeIcon icon={faGhost} size='2x' className={styles.navLogo} />
                        <h2 className='text-[1.6rem]'>{projectName}</h2>
                    </div>
                </Link>


                {/* Nav items */}
                <ul className={click ? styles.navMenu : [styles.navMenu, styles.closed].join(' ')}>

                    {/* Nav items front portion */}
                    <ul className={styles.navFrontPortion}>
                        <Link href='/community' className="p-0">
                            <li className={styles.navFrontPortionItem}>Community</li>
                        </Link>

                        <Link href={'/generate'}>
                            <li className={styles.navFrontPortionItem}>Generate</li>
                        </Link>
                    </ul>

                    {/* Nav items back portion */}
                    {/* Protected: if not loggedin, show sign in button, otherwise the nav items */}
                    {!isLoggedIn ?
                        <button className={[styles.navBtn].join(' ')}
                            onClick={() => { void signIn().catch(console.error) }}>
                            Sign in
                        </button>
                        :
                        <>
                            <li className='w-full min-h-[3rem] flex items-center justify-center border-b border-gray-400 md:border-0 lg:border-0 lg:w-[6rem] text-gray-100 md:text-gray-100 lg:text-gray-400 lg:text-center'>
                                Credits: {user.data?.credits}
                            </li>

                            <li className={styles.profilePicWrapper}
                                ref={triggerDropDownRef}
                                onClick={() => setSubMenuClicked(!subMenuClicked)}
                            >
                                <Image src={session?.user.image || '/ape.jpg'}

                                    alt='profile picture'
                                    width='35'
                                    height='35'
                                    className="rounded-full cursor-pointer block md:block lg:block lg:my-0 md:my-0 my-[1%]"
                                // onClick={() => { setSubMenuClicked(!subMenuClicked); console.log('clicked') }}
                                />
                            </li>

                            <ul ref={dropDownRef} className={subMenuClicked ? styles.subNavMenu : [styles.subNavMenu, styles.hidden].join(' ')}>
                                <li onClick={() => router.push('/profile')}
                                    className={styles.navItem}>
                                    Profile
                                </li>

                                <li onClick={handleBuyCredits}
                                    className={styles.navItem}>
                                    Buy Credits
                                </li>

                                <li className={styles.navItem}
                                    onClick={() => { void signOut().catch(console.error); router.push('/') }}>
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
