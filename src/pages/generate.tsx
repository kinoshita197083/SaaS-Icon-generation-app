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
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { z } from 'zod';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const formDataSchema = z.object({
//     prompt: z.string(),
//     color: z.string(),
//     style: z.string(),
//     n: z.number(),
//     imageURLs: z.array(z.string()),
//     loading: z.boolean(),
// });

const Generate: NextPage = () => {

    //Default Config for initial page load
    const defaultImage = ['/jene.jpg'];
    const defaultStyle = 'Default';
    const defaultColor = '';
    // const defaultText = 'Abyssinian cat';
    const defaultNumberOfImages = 1;

    //Auth verification
    const { status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const generateInstance = api.generate.generateIcon.useMutation();

    //Form State
    const [formData, setFormData] = useState({
        prompt: '',
        color: defaultColor,
        style: defaultStyle,
        n: defaultNumberOfImages,
        imageURLs: defaultImage,
        loading: false,
    });

    //Update Form property
    const updateForm = (key: string, value: string | boolean | number | string[]) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    //Choosing whether the default pre-configured colors or color-picker
    const [colorOption, setColorOption] = useState('default');

    //Error Message state
    const [error, setError] = useState({
        activate: false,
        message: ''
    });

    // const validateFormData = () => {
    //     try {
    //         formDataSchema.parse(formData);
    //     } catch (error) {
    //         setError({
    //             activate: true,
    //             message: `Invalid Data: ${error}`
    //         })
    //         setTimeout(() => setError({ activate: false, message: '' }), 5000);
    //     }
    // }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        updateForm('loading', true)
        // validateFormData();

        try {
            const response = await generateInstance.mutateAsync({
                prompt: (formData.prompt).trim(),
                color: formData.color,
                style: formData.style,
                n: +formData.n,
            });

            if (response.images) updateForm('imageURLs', response.images);

        } catch (error) {
            setError({
                activate: true,
                message: error.message,
            });
            setTimeout(() => setError({ activate: false, message: '' }), 5000);
        } finally {
            setFormData(prev => ({ ...prev, prompt: '', color: defaultColor, style: defaultStyle, loading: false }))
        }
    }

    return (
        <>
            <Head>
                <title>Icon Generation</title>
                <meta name='ai-generation' content='ai powered icon generation' />
                {/* <link rel="icon" href="" /> */}
            </Head>

            <PageTemplate>
                <form className="mt-[5%] lg:mt-[1%] md:mt-[3%] lg:w-[55%]" onSubmit={handleSubmit}>
                    <section className="mb-[5%]">
                        <TextField
                            label="Desribe your icon"
                            required
                            maxRows={4}
                            multiline
                            variant="standard"
                            fullWidth
                            value={formData.prompt}
                            onChange={e => updateForm('prompt', (e.target.value).replace(/[!@#$%^&*()\-_=+[\]{};:'".<>?|`~\\/]/g, ''))}
                            InputLabelProps={{
                                style: { fontSize: '1.3rem', color: 'white' },
                            }}
                            InputProps={{
                                style: { color: 'white', fontSize: '1.5rem' },
                            }}
                            helperText="Detailed prompt usaully works better"
                            FormHelperTextProps={{
                                sx: {
                                    color: 'rgb(129 140 248)',
                                },
                            }}
                        />
                    </section>

                    <section className="mb-[8%] ">
                        <FormLabel label="Theme color" />
                        <div>
                            {/* Button Group let user select either pre-configured colors or color-picker */}
                            <div role="button-group"
                                className="flex my-[5%]"
                            >
                                <button type="button"
                                    className={["lg:w-[20%] w-[50%] text-gray-100 transition-all", colorOption === 'default' ? 'border-b-4 border-indigo-500' : 'border-b-4 border-gray-700'].join(' ')}
                                    onClick={() => setColorOption('default')}>
                                    Default
                                </button>

                                <button type="button"
                                    className={["lg:w-[20%] w-[50%] text-gray-100 transitional-all", colorOption === 'colorPicker' ? 'border-b-4 border-indigo-500' : 'border-b-4 border-gray-700'].join(' ')}
                                    onClick={() => setColorOption('colorPicker')}>
                                    ColorPicker
                                </button>
                            </div>

                            {colorOption === 'colorPicker' &&
                                <div className="h-[4rem] lg:w-[40%] w-full flex items-center justify-center">
                                    <input
                                        type="color"
                                        className='color-picker'
                                        value={formData.color || '#4ef4ac'}
                                        onChange={(e) => updateForm('color', (e.target as HTMLInputElement).value)}
                                    />
                                </div>}

                            {colorOption === 'default' &&
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
                                </div>}
                        </div>

                    </section>
                    <section className="">
                        <FormLabel
                            label="Select a style"
                        />
                        <div className="flex gap-[3%] flex-wrap mt-[2%] mb-[8%]">
                            {styles.map(style => {

                                const target = formData.style === style.prompt

                                return (
                                    <Tooltip key={style.style} title={style.style}>
                                        <button
                                            key={style.style}
                                            className="aspect-square lg:w-[6rem] lg:h-[6rem] w-[5rem] h-[5rem] mt-[2.5%] border rounded cursor-pointer hover:scale-[1.2] duration-100"
                                            onClick={e => updateForm('style', (e.target as HTMLButtonElement).value)}
                                            style={{ background: `url(${style.src}) no-repeat center`, backgroundSize: 'cover', border: target ? '2px solid white' : '', transform: target ? 'scale(1.2)' : '' }}
                                            type='button'
                                            value={style.prompt}
                                        />
                                    </Tooltip>
                                )
                            })}
                        </div>
                    </section>

                    {/* <section role="advance configuration sub-menu"
                        className={['h-[2.5rem] overflow-hidden bg-gray-800 rounded py-[1%] mb-[5%] cursor-pointer'].join(' ')}>
                        <div className="pl-[5%]">
                            <FormLabel
                                label="Advance"
                            />
                        </div>
                        <ul>
                            <li>
                                <FormLabel
                                    label="Subject position"
                                />
                            </li>

                            <li>
                                <FormLabel
                                    label="Subject posture"
                                />
                            </li>
                        </ul>
                    </section> */}

                    <section>
                        <FormLabel
                            label="Number of images"
                        />
                        <label className="block text-[1rem] text-gray-400 mb-[1%]">1 credit per image</label>
                        <input
                            className="w-full lg:h-[2rem] p-[2%] mb-[5%] rounded bg-gray-700 text-white focus:outline-[transparent]"
                            onChange={e => updateForm('n', e.target.value)}
                            type="number"
                            min={1}
                            max={9}
                            defaultValue={defaultNumberOfImages} />
                    </section>

                    {isLoggedIn ?
                        <Button
                            disabled={formData.prompt.length > 1 ? false : true}>
                            {formData.loading ? 'Processing ...' : 'Generate'}
                        </Button>
                        :
                        <Button
                            type="button"
                            onClick={() => { signIn().catch(console.error) }}
                            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-gray-100 p-[2%] px-[3%] rounded">
                            Sign in to start generating
                        </Button>}

                    {error.activate &&
                        <div className="lg:absolute w-full left-[50%] flex items-center justify-center lg:translate-x-[-50%]">
                            <Alert severity="error">{error.message}</Alert>
                        </div>
                    }
                </form>

                {/* The generated image placeholder */}
                <section className="relative flex aspect-square lg:w-[45%] h-[auto] w-[100%] my-[8%] mx-auto lg:m-auto bg-gray-700 rounded-[15px]">

                    {formData.loading ?
                        <>
                            <Skeleton
                                sx={{ bgcolor: 'grey.900' }}
                                variant="rectangular"
                                width={'100%'}
                                height={'100%'}
                                className='rounded-[inherit]'
                            /> <CircularProgress
                                size={54}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-25px',
                                    marginLeft: '-25px',
                                }}
                            />
                        </>
                        : <Carousel
                            images={formData.imageURLs}
                            downloadable
                        />}
                </section>

                <CloseButton />

            </PageTemplate>
        </>
    )
}

export default Generate
