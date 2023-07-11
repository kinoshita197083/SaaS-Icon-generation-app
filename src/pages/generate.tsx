import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Button from "~/component/button";
import Carousel from "~/component/carousel";
import { colors } from "~/material/color";
import { styles } from "~/material/styles";
import { api } from "~/utils/api";

const Generate: NextPage = () => {

    const defaultImage = ['/jene.jpg'];
    const defaultStyle = '';
    const defaultColor = 'sky blue';
    const defaultText = 'Abyssinian cat';
    const defaultNumberOfImages = 1;


    const [formData, setFormData] = useState({
        prompt: '',
        color: defaultColor,
        style: defaultStyle,
        n: defaultNumberOfImages,
        imageURLs: defaultImage,
        loading: false,
    });

    const { status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const generateInstance = api.generate.generateIcon.useMutation({});

    const inputStyle = {
        backgroundColor: 'transparent',
        borderBottom: '1px solid white'
    }

    const labelCSS = 'text-gray-100 text-[1.3rem]';
    const inputCSS = 'mt-[1%] mb-[8%] h-[2.5rem] w-full text-gray-200 lg:text-[1.5rem] px-[2%] outline-gray-800';

    const handleSubmit = async (e: FormEvent) => {
        updateForm('loading', true)

        e.preventDefault();

        try {
            const response = await generateInstance.mutateAsync({
                prompt: formData.prompt,
                color: formData.color,
                style: formData.style,
                n: +formData.n,
            });

            if (response.image) {
                updateForm('imageURLs', response.image)
            }
        }
        catch (err) {
            console.log(err)
        }

        setFormData(prev => ({ ...prev, prompt: '', color: defaultColor, style: defaultStyle, loading: false }))
    }

    const updateForm = (key: string, value: string | boolean | number | string[]) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="min-h-[120vh] py-[20%] px-[2%] lg:py-[5%] lg:px-[1%] relative">
            <section className="bg-gray-700 min-h-[inherit] bg-no-repeat bg-cover p-[3%] lg:py-[3%] lg:px-[10%]">
                <div className="container-s flex flex-col lg:flex-row gap-[5%] blur-dark lg:min-h-[40rem] overflow-scroll animate-fadein">
                    <form className="mt-[5%] lg:w-[55%]" onSubmit={handleSubmit}>
                        <div className="">
                            <label className={labelCSS}>Describe your icon</label>
                            <input
                                className={inputCSS}
                                style={inputStyle}
                                value={formData.prompt}
                                onChange={e => updateForm('prompt', e.target.value)}
                                placeholder={defaultText}
                            />
                        </div>

                        <div className="mb-[8%]">
                            <label className={labelCSS}>Theme color</label>
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
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="">
                            <label className={["block", labelCSS].join(' ')}>Number of images</label>
                            <label className="block text-[1rem] text-gray-400 mb-[1%]">1 credit per image</label>
                            <input
                                className="w-full lg:h-[2rem] p-[2%] mb-[5%] rounded bg-gray-700 text-white focus:outline-[transparent]"
                                onChange={e => updateForm('n', e.target.value)}
                                type="number"
                                min={1}
                                defaultValue={1} />
                        </div>

                        {isLoggedIn ?
                            <Button
                                disabled={formData.prompt.length > 1 ? false : true}>
                                Generate
                            </Button>
                            :
                            <Button
                                type="button"
                                onClick={() => { void signIn().catch(console.error) }}
                                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-gray-100 p-[2%] px-[3%] rounded">
                                Sign in to start generating
                            </Button>}



                    </form>
                    <div className="relative flex aspect-square lg:w-[45%] h-[auto] w-[100%] my-[8%] mx-auto lg:m-auto bg-gray-700 rounded-[15px]">
                        <Carousel
                            images={formData.imageURLs}
                            downloadable
                        />

                        {formData.loading &&
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-[5rem] loading"
                            />
                        }
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
