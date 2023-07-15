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
