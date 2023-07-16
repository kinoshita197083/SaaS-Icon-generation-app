import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Button from "~/component/button";
import Carousel from "~/component/carousel";
import CloseButton from "~/component/closeButton";
import FormLabel from "~/component/formLabel";
import PageTemplate from "~/component/page/pageTemplate";
import { colors } from "~/material/color";
import { styles } from "~/material/styles";
import { api } from "~/utils/api";


const Generate: NextPage = () => {

    //Default Config for initial page load
    const defaultImage = ['/jene.jpg'];
    const defaultStyle = '';
    // const defaultColor = 'sky blue';
    const defaultColor = '';
    const defaultText = 'Abyssinian cat';
    const defaultNumberOfImages = 1;

    //Form State
    const [formData, setFormData] = useState({
        prompt: '',
        color: defaultColor,
        style: defaultStyle,
        n: defaultNumberOfImages,
        imageURLs: defaultImage,
        loading: false,
    });

    //Error Message state
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    //Auth verification
    const { status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const generateInstance = api.generate.generateIcon.useMutation({
        // onError(error) {
        //     setError(true);
        //     if (error.data?.code === 'BAD_REQUEST') {
        //         setErrorMsg('Not enough credit');
        //     } else {
        //         setErrorMsg('Error: Transaction Cancelled')
        //     }
        //     setTimeout(() => setError(false), 3000);
        // }
    });

    const inputCSS = 'mt-[1%] mb-[8%] h-[2.5rem] w-full text-gray-200 lg:text-[1.5rem] px-[2%] outline-gray-800 bg-transparent border-b border-white';

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
        catch (error) {
            setError(true)
            const httpCode = getHTTPStatusCodeFromError(error);
            setErrorMsg(`${httpCode}: transaction cancelled`)
            setTimeout(() => setError(false), 3000);
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
        <>
            <Head>
                <title>Icon Generation</title>
                <meta name='ai-generation' content='ai powered icon generation' />
                {/* <link rel="icon" href="" /> */}
            </Head>

            <PageTemplate>
                <form className="mt-[5%] lg:w-[55%]" onSubmit={handleSubmit}>
                    <section className="">
                        <FormLabel
                            label="Descibe your icon"
                        />
                        <input
                            className={inputCSS}
                            value={formData.prompt}
                            onChange={e => updateForm('prompt', e.target.value)}
                            placeholder={defaultText}
                        />
                    </section>

                    <section className="mb-[8%]">
                        <FormLabel
                            label="Theme color"
                        />
                        <div className="flex gap-[1%] flex-wrap mt-[3%]">
                            {colors.map((color, index) => {

                                const target = formData.color === Object.values(color).toString();

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
                    </section>
                    <section className="">
                        <FormLabel
                            label="Select a style"
                        />
                        <div className="flex gap-[3%] flex-wrap mt-[2%] mb-[8%]">
                            {styles.map((style, index) => {
                                const styleSample = Object.values(style).toString();
                                const styleName = Object.keys(style).toString();

                                const target = formData.style === styleName

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
                    </section>

                    <section className="">
                        <FormLabel
                            label="Number of images"
                        />
                        <label className="block text-[1rem] text-gray-400 mb-[1%]">1 credit per image</label>
                        <input
                            className="w-full lg:h-[2rem] p-[2%] mb-[5%] rounded bg-gray-700 text-white focus:outline-[transparent]"
                            onChange={e => updateForm('n', e.target.value)}
                            type="number"
                            min={1}
                            defaultValue={1} />
                    </section>

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

                    {error &&
                        <div className="absolute w-[30%] h-[3rem] flex items-center justify-center rounded bg-red-500 bottom-[1rem] left-[50%] translate-x-[-50%]">
                            <h3 className="text-gray-100">{errorMsg}</h3>
                        </div>}
                </form>
                <section className="relative flex aspect-square lg:w-[45%] h-[auto] w-[100%] my-[8%] mx-auto lg:m-auto bg-gray-700 rounded-[15px]">
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
                </section>

                <CloseButton />


            </PageTemplate>
        </>
    )
}

export default Generate
