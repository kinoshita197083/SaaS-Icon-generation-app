import { type NextPage } from "next";
import { useRef, useState, useEffect } from "react";
import LandingPage from "~/component/page/landingPage";
import HomePage from "~/component/page/homePage";
import Trackbar from "~/component/Trackbar";
import CustomHead from "~/component/head";
import Script from "next/script";

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

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WPVQX5D8MP"></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WPVQX5D8MP');`
        }
      </Script>

      <CustomHead
        title="Imagin - AI Powered Icon Generation"
        googleVerified
        indexPage
        description="Generate custom icons using AI-powered technology. Imagin empowers you to create unique icons effortlessly."
        keywords="icon generation, logo generation, free AI-powered icons, custom icons, free icon creator, create logo, design logo, anime icon, logo, professional, beautiful icons in a few clicks"
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
