import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/designToken.css";
import "~/styles/utility.css";
import Navbar from "~/component/navbar";
import Footer from "~/component/footer";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; /* eslint-disable import/first */

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <NextTopLoader />
      <Navbar logo={'/logo.svg'} projectName='Imagin' navbarItems={[{ text: 'Sign in', type: 'auth' }]} />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
