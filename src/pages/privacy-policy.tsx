import { NextPage } from 'next'
import { Head } from 'next/document'
import React from 'react'

const Privacy: NextPage = () => {
    return (
        <>
            <Head>
                {/* Document Title */}
                <title>Privacy Policy - Imagin</title>
                <link rel="icon" href="logo.svg" />

                {/* Meta Tags */}
                <meta name='description' content='Read our Privacy Policy to learn how we handle and protect your personal information.' />
                <meta name='robots' content='noindex, nofollow' />
            </Head>
            <div className='p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>

                <h1 className='font-extrabold lg:text-5xl md:text-4xl text-3xl mb-[5%]'>Privacy and Policy</h1>

                <h2 className='font-bold text-2xl mb-[5%]'>We process your personal data as follows</h2>

                <h2 className='font-bold text-2xl my-[2%]'>Acknowledgment</h2>
                <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
                <br />
                <h4 className='font-bold text-2xl my-[2%]'>Information we collect through your use of our Services</h4>
                <p>Personal Data</p>
                <ul>
                    <li>Email address</li>
                    <li>First name and last name</li>
                </ul>

                <br />
                <h4 className='font-bold text-2xl my-[2%]'>Usage Data</h4>
                <p>Usage Data is collected automatically when using the Service.</p><br />
                <p>Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p><br />
                <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p><br />
                <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p><br />

                <h4 className='font-bold text-2xl my-[2%]'>Information we receive from third parties</h4>
                <p>We might obtain information about you from third-party sources. For instance, if you use our Services through a third-party connection or log-in (e.g., via Facebook or Google), that third party may provide us with certain details regarding your use of their service. This information could comprise your name, email address, and any other data you have allowed the third party to share with us. Before linking or connecting third-party services to our Services, it is advisable to review and, if needed, adjust your privacy settings on those third-party platforms.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Cookies</h4>
                <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
                <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Use of Your Personal Data</h4>
                <p>he Company may use Personal Data for the following purposes:</p>
                <p>To provide and maintain our Service, including to monitor the usage of our Service.</p>
                <p>To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Retention of Your Personal Data</h4>
                <p>The Platform will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Changes to this policy</h4>
                <p>We may periodically update this policy to align with our current practices and comply with relevant laws. We advise you to visit this page occasionally to stay informed about any updates.</p>



                <h4 className='font-bold text-2xl my-[2%]'>Contact Us</h4>
                <p>If you have any questions, suggestions or concerns, please contact us at:</p><br />

                <p>Email: <span className='text-indigo-700'>imaginincofficial@gmail.com</span></p>
            </div>
        </>
    )
}

export default Privacy
