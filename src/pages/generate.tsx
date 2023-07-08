import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next"
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Button from "~/component/button";
import { colors } from "~/material/color";
import { styles } from "~/material/styles";
import { api } from "~/utils/api";

const Generate: NextPage = () => {

    const [formData, setFormData] = useState({
        prompt: '',
        color: '',
        style: '',
    });

    const [imageURL, setImageURL] = useState('');

    const generateInstance = api.generate.generateIcon.useMutation({});

    const inputStyle = {
        backgroundColor: 'transparent',
        borderBottom: '1px solid white'
    }

    const labelCSS = 'text-gray-100 text-[1.3rem]';
    const inputCSS = 'mt-[1%] mb-[8%] h-[2.5rem] w-full text-gray-200 lg:text-[1.5rem] px-[2%] outline-gray-800';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await generateInstance.mutateAsync({
            prompt: formData.prompt
        });

        if (response.image) {
            setImageURL(response.image)
        }
        setFormData({ prompt: '', color: '', style: '' })
    }

    const updateForm = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    // console.log('re-rendered')

    // useEffect(() => {
    //     setTimeout(() => window.scrollTo(0, 200), 1000)
    // }, [])

    return (
        <div className="min-h-[120vh] py-[20%] px-[2%] lg:py-[7%] lg:px-[8%] relative page-transition">
            <section className="bg-[url(/ocean.jpg)] min-h-[inherit] bg-no-repeat bg-cover p-[3%] lg:p-[15%]">
                <div className="container-s flex flex-col lg:flex-row gap-[5%] blur-dark lg:min-h-[40rem] overflow-scroll animate-fadein">
                    <form className="mt-[5%] lg:w-[55%]" onSubmit={handleSubmit}>
                        <div className="">
                            <label className={labelCSS}>Describe your icon</label>
                            <input
                                className={inputCSS}
                                style={inputStyle}
                                value={formData.prompt}
                                onChange={e => updateForm('prompt', e.target.value)}
                                placeholder="a red anime cat"
                            />
                        </div>
                        <div className="mb-[8%]">
                            <label className={labelCSS}>Pick a color</label>
                            <div className="flex gap-[1%] flex-wrap mt-[3%]">
                                {colors.map((color, index) => {

                                    let target = formData.color === Object.values(color).toString();

                                    return (
                                        <button
                                            key={index}
                                            className={[Object.keys(color).toString(), 'w-[2rem] h-[2rem] mt-[1.5%] rounded-full cursor-pointer hover:scale-[1.2] duration-100'].join(' ')}
                                            onClick={e => updateForm('color', (e.target as HTMLButtonElement).value)}
                                            type='button'
                                            value={Object.values(color)}
                                            style={{ border: target ? '2px solid white' : '', transform: target ? 'scale(1.2)' : '' }}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="">
                            <label className={labelCSS}>Select a style</label><br />
                            <div className="flex gap-[3%] flex-wrap mt-[2%] mb-[8%]">
                                {styles.map((style, index) => {
                                    const styleSample = Object.values(style).toString();
                                    const styleName = Object.keys(style).toString();

                                    let target = formData.style === styleName

                                    return (
                                        <button
                                            key={index}
                                            className="aspect-square lg:w-[6rem] lg:h-[6rem] w-[5rem] h-[5rem] mt-[2.5%] border rounded cursor-pointer hover:scale-[1.2] duration-100"
                                            onClick={e => updateForm('style', (e.target as HTMLButtonElement).value)}
                                            style={{ background: `url(${styleSample}) no-repeat center`, backgroundSize: 'cover', border: target ? '2px solid white' : '', transform: target ? 'scale(1.2)' : '' }}
                                            type='button'
                                            value={styleName}
                                        // style={{ border: target ? '2px solid white' : '', transform: target ? 'scale(1.2)' : '' }}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <Button>Submit</Button>
                    </form>
                    <div className="relative aspect-square lg:w-[45%] w-[50%] my-auto container-s bg-gray-700 rounded-[15px] overflow-hidden">
                        <img
                            src={imageURL || '/brad.jpg'}
                            alt='generated icon'
                            className="absolute inset-0"
                        />
                    </div>

                    <Link href='/'>
                        <span className="absolute aspect-square bg-red-500 w-[1.5rem] rounded-full text-transparent hover:text-gray-700 flex justify-center items-center cursor-pointer top-[1%] right-[3%] lg:top-[3%]"><FontAwesomeIcon icon={faXmark} /></span>
                    </Link>
                </div>

            </section>
        </div >
    )
}

export default Generate
