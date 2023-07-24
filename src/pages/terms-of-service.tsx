import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Terms: NextPage = () => {
    return (
        <>
            <Head>
                {/* Document Title */}
                <title>Terms of Service - Imagin</title>
                <link rel="icon" href="logo_bulb.png" />

                {/* Meta Tags */}
                <meta name='description' content='Read our terms of service to learn about the terms and conditions that apply to your use of our website.' />
                <meta name='robots' content='noindex, nofollow' />
            </Head>
            <div className='p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>

                <h1 className='font-extrabold lg:text-5xl md:text-4xl text-3xl mb-[5%]'>Terms and Conditions</h1>

                <h2 className='font-bold text-2xl mb-[1%]'>Acknowledgment</h2>
                <p>These Terms of Use apply to all users of the platform imagin (hereinafter: the User).</p>
                <p>These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>

                <h4 className='font-bold text-2xl mt-[3%] mb-[2%]'>Definitions</h4>
                <p>Platform (referred to as either &quot;the platform&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to the copyright owner of imagin.</p>
                <p>Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                <p>Service refers to the Website.</p>
                <p>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Interpretation</h4>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>


                <h4 className='font-bold text-2xl my-[2%]'>Links to Other Websites</h4>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
                <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

                <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Icon Management</h4>
                <p>We can use your icons to promote our service. This includes, but is not limited to: online ads, physical ads, social media posts, and anywhere inside this application.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Termination</h4>
                <p>Your access may be terminated or suspended instantly, without prior notice or liability, for any reason, including but not limited to, if You violate these Terms and Conditions.</p>
                <p>Upon termination, Your right to use the Service will cease immediately.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Rights and Obligations of the User</h4>
                <p>By using the service (accessing & interacting with the website), the User agrees not to engage in any activities that may jeopardize the functionality or operation of the software. Specifically, the User is strictly prohibited from conducting scans or tests on the software&apos;s vulnerabilities, circumventing security systems, accessing the software&apos;s systems, or introducing malware into the software.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Limitation of Liability</h4>
                <p>Our service uses AI provided by OpenAI to generate icons. Please review copyright laws for your country and state in regards to AI generated art or images. By using our services, you agree that our platform and service assumes no responsibility for the images generated. Nor do we assume responsibility for damages or loss caused by these images.</p>
                <p>To the maximum extent permitted by applicable law, in no event shall the Platform or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Platform or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Disclaimer</h4>
                <p>To the maximum extent permitted under applicable law, the Platform, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Platform provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Disputes Resolution</h4>
                <p>Please note that, generations are not refundable.</p>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Platform.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Changes to These Terms and Conditions</h4>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time.</p>

                <h4 className='font-bold text-2xl my-[2%]'>Contact Us</h4>
                <p>If you have any questions, suggestions or concerns, please contact us at:</p>

                <p>Email: <span className='text-indigo-700'>imaginincofficial@gmail.com</span></p>
            </div>
        </>
    )
}

export default Terms
