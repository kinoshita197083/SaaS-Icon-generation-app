import { NextPage } from "next"
import { useEffect } from "react";
import Collection from "~/component/collection"

const Generate: NextPage = () => {

    const inputStyle = {
        backgroundColor: 'transparent',
        borderBottom: '1px solid white'
    }

    const labelCSS = 'text-gray-100 text-[1.3rem]';
    const inputCSS = 'mt-[1%] mb-[8%] h-[2.5rem] w-full text-gray-200 lg:text-[1.5rem] px-[2%] outline-gray-800';

    useEffect(() => {
        window.scrollTo(0, 300)
    }, [])

    return (
        <div className="min-h-[120vh] py-[20%] px-[2%] lg:py-[7%] lg:px-[8%]">
            <section className="bg-[url(/ocean.jpg)] min-h-[inherit] bg-no-repeat bg-cover p-[22%]">

                <Collection
                    collectionName="Generate"
                    blur={'23px'}
                    flex
                    darkness
                    padding='15% 12%'
                    height='40rem'
                    overflow="scroll"
                >

                    <Collection
                        blur="99px"
                        padding="2% 3%"
                        margin="5% 0"
                        rounded="10px"
                    >
                        <article className="">
                            <h2 className="lg:text-[1.4rem] text-gray-200">Let's start imagining</h2>
                            <li className="lg:text-[1rem] text-gray-200 mt-[2%]">try using simple prompts</li>
                        </article>
                        <span className="absolute top-0 right-0 w-[1rem] h-[1rem] bg-emerald-600 rounded-full animate-ping" />
                    </Collection>

                    <form className="mt-[5%]">
                        <div className="">
                            <label className={labelCSS}>Describe your icon</label><br />
                            <input className={inputCSS} style={inputStyle} placeholder="anime cat"></input>
                        </div>
                        <div className="mb-[8%]">
                            <label className={labelCSS}>Pick a color</label><br />
                            <div className="flex gap-[1%] flex-wrap">
                                <span className="bg-sky-300 w-[2rem] h-[2rem] rounded cursor-pointer" />
                                <span className="bg-emerald-300 w-[2rem] h-[2rem] rounded cursor-pointer" />
                                <span className="bg-blue-300 w-[2rem] h-[2rem] rounded cursor-pointer" />
                                <span className="bg-yellow-300 w-[2rem] h-[2rem] rounded cursor-pointer" />
                                <span className="bg-red-300 w-[2rem] h-[2rem] rounded cursor-pointer" />
                            </div>
                        </div>
                        <div className="">
                            <label className='text-gray-100 text-[1.3rem]'>Select a style</label><br />
                            <div className="flex gap-[3%] flex-wrap mt-[2%]">
                                <span className="bg-blue-300 w-[4rem] h-[4rem] rounded cursor-pointer" />
                                <span className="bg-blue-300 w-[4rem] h-[4rem] rounded cursor-pointer" />
                                <span className="bg-blue-300 w-[4rem] h-[4rem] rounded cursor-pointer" />
                            </div>
                        </div>

                    </form>
                </Collection>
            </section>
        </div>
    )
}

export default Generate
