import React, { ReactNode } from 'react'

type PageTemplateProps = {
    children: ReactNode
}

const PageTemplate = (props: PageTemplateProps) => {

    const { children } = props;

    return (
        <div className='py-[12%] pt-[18%] px-[3%] lg:p-[8%] lg:pt-[8%] md:pt-[8%]'>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-violet-400 to-90% rounded-[25px]">
                <div className="container-s flex flex-col lg:flex-row gap-[5%] blur-dark lg:min-h-[40rem] overflow-hidden animate-fadein rounded-[inherit]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageTemplate
