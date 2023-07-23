import { type NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useRef, useState, useEffect } from "react";
import LandingPage from "~/component/page/landingPage";
import HomePage from "~/component/page/homePage";
import Trackbar from "~/component/Trackbar";

const pages = [{ id: 1, page: <LandingPage /> }, { id: 2, page: <HomePage /> }];
const pagesIndex = [...pages.keys()];

const Home: NextPage = () => {

  const [slide, setSlide] = useState(0);

  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideWidth = Math.floor(window.innerWidth / 2)

    const calculateSlide = () => {
      if (main.current) {

        if (main.current.scrollLeft >= slideWidth) {
          setSlide(1)
        }
        if (main.current.scrollLeft <= slideWidth) {
          setSlide(0)
        }
      }
    }

    main.current?.addEventListener('scroll', calculateSlide)

    return () => {
      main.current?.removeEventListener('scroll', calculateSlide)
    }
  }, [])

  return (
    <>
      <Head>
        {/* Document Title */}
        <title>Imagin - AI Powered Icon Generation</title>

        {/* Meta Tags */}
        <meta name='description' content='Generate custom icons using AI-powered technology. Imagin empowers you to create unique icons effortlessly.' />
        <meta name='keywords' content='icon generation, AI-powered icons, custom icons, icon creator' />
        <meta name='author' content='Imagin World Platform' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.imaginworld.com/' />

        {/* Open Graph (OG) Tags for Social Media Sharing */}
        <meta property='og:title' content='Imagin - AI Powered Icon Generation' />
        <meta property='og:description' content='Generate custom icons using AI-powered technology. Imagin empowers you to create unique icons effortlessly.' />
        <meta property='og:image' content='logo.svg' />
        <meta property='og:url' content='https://www.imaginworld.com/' />
      </Head>
      <main ref={main} className='frame py-[8%] lg:py-[2%] font-sans'>
        {pages.map((page) => {
          return (
            <div key={page.id} className={'snap-center flex-screen overflow-hidden'}>
              {page.page}
            </div>
          )
        })}

        <Trackbar
          items={pagesIndex}
          currentSlide={slide}
        />
      </main >
    </>
  );
};

export default Home;
