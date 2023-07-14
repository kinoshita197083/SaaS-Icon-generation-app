import React, { ReactNode } from 'react'

type PageTemplateProps = {
    children: ReactNode
}

const PageTemplate = (props: PageTemplateProps) => {

    const { children } = props;

    return (
        <div className="min-h-[120vh] py-[20%] px-[2%] lg:py-[5%] lg:px-[1%] relative">
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-violet-400 to-90% min-h-[inherit] bg-no-repeat bg-cover p-[3%] lg:py-[3%] lg:px-[10%]">
                <div className="container-s flex flex-col lg:flex-row gap-[5%] blur-dark lg:min-h-[40rem] overflow-hidden animate-fadein">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageTemplate
