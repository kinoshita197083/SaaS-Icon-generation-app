import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import LandingPage from "~/component/page/landingPage";
import HomePage from "~/component/page/homePage";
import Trackbar from "~/component/Trackbar";
import CustomHead from "~/component/head";

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
      <CustomHead
        title="Imagin - AI Powered Icon Generation"
        googleVerified
        indexPage
        description="Generate custom icons using AI-powered technology. Imagin empowers you to create unique icons effortlessly."
        keywords="icon generation, logo generation, AI-powered icons, custom icons, icon creator, create logo, design logo, anime icon, logo, professional, beautiful icons in a few clicks, open-ai"
        follow
      />

      <main ref={main} className='py-[8%] lg:py-[2%] font-sans'>
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
