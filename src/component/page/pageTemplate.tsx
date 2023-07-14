import React, { ReactNode } from 'react'

type PageTemplateProps = {
    children: ReactNode
}

const PageTemplate = (props: PageTemplateProps) => {

    const { children } = props;

    return (
        // <div className="min-h-[120vh] py-[20%] px-[2%] lg:py-[5%] lg:px-[1%] relative">
        <div className='py-[12%] px-[3%] lg:p-[8%]'>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-violet-400 to-90% bg-no-repeat bg-cover rounded-[25px]">
                <div className="container-s flex flex-col lg:flex-row gap-[5%] blur-dark lg:min-h-[40rem] overflow-hidden animate-fadein rounded-[inherit]">
                    {children}
                </div>
            </div>
        </div>

        // </div>
    )
}

export default PageTemplate
