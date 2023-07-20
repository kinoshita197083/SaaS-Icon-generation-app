import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/navbar.module.css'
import { Suspense, useEffect, useRef, useState } from 'react';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import MenuIcon from "./menuIcon";
import { CircularProgress } from "@mui/material";

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
    const navbarRef = useRef<HTMLDivElement>(null);

    const { data: session, status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const user = api.user.getUser.useQuery();

    const router = useRouter();

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

        //TriggerDropDown (profile pic) will only appeared when user logged in
        if (isLoggedIn) {
            if (navbarRef.current && triggerDropDownRef.current) {
                !navbarRef.current.contains(e.target as Node) && !triggerDropDownRef.current.contains(e.target as Node) ?
                    setClick(false) : null;
            }
        }
        else {
            if (navbarRef.current) {
                !navbarRef.current.contains(e.target as Node) ? setClick(false) : null;
            }
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

    useEffect(() => {
        document.addEventListener('click', closeMobileNavMenu)

        return () => {
            document.removeEventListener('click', closeMobileNavMenu)
        }
    }, [isLoggedIn])

    return (
        <header className={scroll ? [styles.navContainer, styles.scrolled].join(' ') : styles.navContainer}>
            <nav className={styles.navbar}>

                {/* Menu Icon for mobile */}
                <div className={styles.menuIcon} ref={navbarRef}>
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
                            <Link href='/purchase' className='w-full lg:w-[6rem]'>
                                <li className='w-full lg:min-h-max flex items-center justify-center border-b border-gray-400 md:border-0 lg:border-0 lg:w-[6rem] md:w-[6rem] md:mx-auto text-gray-100 lg:text-gray-400 md:text-gray-400 lg:text-center hover:bg-gray-800 hover:text-gray-100 transition-all lg:rounded-[15px] md:rounded-[15px] min-h-[3rem]'>
                                    Credits: {user.data?.credits}
                                </li>
                            </Link>

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
                                <Suspense fallback={<CircularProgress
                                    size={54}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-25px',
                                        marginLeft: '-25px',
                                    }}
                                />}>
                                </Suspense>
                                <li onClick={() => { router.push('/profile').catch(console.error) }}
                                    className={styles.navItem}>
                                    Profile
                                </li>

                                <li className={styles.navItem}
                                    onClick={() => { signOut().catch(console.error); router.push('/').catch(console.error) }}>
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
