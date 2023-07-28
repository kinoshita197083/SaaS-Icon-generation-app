import React from 'react'
import Head from "next/head"

type CustomHeadProps = {
    title: string,
    googleVerified?: boolean,
    description: string,
    keywords?: string,
    indexPage?: boolean,
    follow?: boolean,
}

const CustomHead = (props: CustomHeadProps) => {

    const { title, googleVerified, description, keywords, indexPage, follow } = props;

    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="logo_bulb.png" />

            {/* Google Verification */}
            {
                googleVerified &&
                <>
                    <meta name="google-site-verification" content="h4Sv-GJ7Xfp15IVuzm8JvzkjIGaaVY7Ly-GWi0zC-jg" />
                </>
            }

            {/* Meta Tags */}
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {
                follow ?
                    <meta name='robots' content='index, follow' /> : <meta name='robots' content='noindex, nofollow' />
            }

            {
                indexPage &&
                <>
                    <meta name='author' content='Imagin World Platform' />
                    <meta name='robots' content='index, follow' />
                    <link rel='canonical' href='https://www.imaginworld.com/' />
                </>
            }

            {/* Open Graph (OG) Tags for Social Media Sharing */}
            {
                indexPage &&
                <>
                    <meta property='og:title' content='Imagin - AI Powered Icon Generation' />
                    <meta property="og:instagram" content="@imaginworld2023" />
                    <meta property='og:description' content='Generate custom icons using AI-powered technology. Imagin empowers you to create unique icons effortlessly.' />
                    <meta property='og:image' content='logo_bulb.png' />
                </>
            }
        </Head>
    )
}

export default CustomHead
