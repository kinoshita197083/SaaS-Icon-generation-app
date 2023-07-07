import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useRef, useState, useEffect } from "react";
import LandingPage from "~/component/page/landingPage/landingPage";
import HomePage from "~/component/page/homePage/homePage";
import Trackbar from "~/component/trackbar/Trackbar";

const pages = [<LandingPage />, <HomePage />];
const pagesIndex = pages.map((__, idx) => idx);

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

  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
      </Head>
      <main ref={main} className='py-[8%] lg:py-[2%] font-sans'>
        {pages.map((page, index) => {
          return (
            <div key={index} className={'snap-center flex-screen'}>
              {page}
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
