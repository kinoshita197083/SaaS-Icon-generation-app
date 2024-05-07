import { NextPage } from "next"
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Button from "~/component/button";
import Carousel from "~/component/carousel";
import CloseButton from "~/component/closeButton";
import FormLabel from "~/component/formLabel";
import PageTemplate from "~/component/page/pageTemplate";
import { colors } from "~/material/color";
import { iconStyles } from "~/material/iconStyles";
import { api } from "~/utils/api";
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import TextField from '@mui/material/TextField';
import { Select, MenuItem, SelectChangeEvent, Tooltip } from "@mui/material";
import CustomHead from "~/component/head";
import CustomButtonGroup from "~/component/buttonGroup";
import StyleOption from "~/component/styleOption";
import { logoStyles } from "~/material/logoStyles";
import { GetColorName } from 'hex-color-to-color-name';
import { useRouter } from "next/router";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Generate: NextPage = () => {

    //Default Config for initial page load
    const defaultImage = ['/jene.jpg'];
    const defaultOrientation = 'side-face';
    const defaultStyle = 'Default';
    const defaultStyleOption = 'icon';
    const defaultColor = 'clean';
    const defaultNumberOfImages = 1;

    //Auth verification
    const { status } = useSession()
    const isLoggedIn = status === 'authenticated';
    const { push } = useRouter();
    const generateInstance = api.generate.generateIcon.useMutation();

    //Form State
    const [formData, setFormData] = useState({
        prompt: '',
        color: defaultColor,
        style: defaultStyle,
        n: defaultNumberOfImages,
        orientation: defaultOrientation,
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
    const [colorOption, setColorOption] = useState('Default');

    const [styleOption, setStyleOption] = useState(defaultStyleOption);

    //Error Message state
    const [error, setError] = useState({
        activate: false,
        message: '',
        promotion: false,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        updateForm('loading', true)

        try {
            const response = await generateInstance.mutateAsync({
                prompt: (formData.prompt).trim(),
                color: formData.color,
                style: formData.style,
                styleType: styleOption,
                orientation: formData.orientation,
                n: +formData.n,
            });
            updateForm('imageURLs', response.images);

        } catch (error) {
            setError(prev => ({
                ...prev,
                activate: true,
                message: error.message,
            }));
            setTimeout(() => setError(prev => ({ ...prev, activate: false, message: '' })), 5000);

            if (error.message === 'Not enough credits') {
                setTimeout(() =>
                    setError(prev => ({
                        ...prev,
                        promotion: true
                    })), 2000);
            }
        } finally {
            setFormData(prev => (
                {
                    ...prev,
                    prompt: '',
                    color: defaultColor,
                    style: defaultStyle,
                    styleOption: defaultStyleOption,
                    orientation: defaultOrientation,
                    loading: false,
                }
            ))
        }
    }

    return (
        <>
            <CustomHead
                title="Generation - Imagin"
                description="Generate custom icons by filling out our icon-generation form. Create unique icons for your projects with ease."
                follow
            />

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
                            onChange={e => updateForm('prompt', (e.target.value).replace(/[!@$%^&*()\-_=+[\]{};:'".<>?|`~\\/]/g, ''))}
                            InputLabelProps={{
                                style: { fontSize: '1.3rem', color: 'white' },
                            }}
                            InputProps={{
                                style: { color: 'white', fontSize: '1.5rem' },
                            }}
                            helperText="Concise and precise prompts generally yield better results"
                            FormHelperTextProps={{
                                sx: {
                                    color: 'rgb(129 140 248)',
                                },
                            }}
                        />
                    </section>

                    <section className="mb-[8%] ">
                        <FormLabel label="Theme color" />
                        <p className="text-indigo-400 text-[0.8rem]">* AI can struggle with recognizing certain colors</p>
                        <div>
                            {/* Button Group let user select either pre-configured colors or color-picker */}
                            <CustomButtonGroup
                                state={colorOption}
                                setState={setColorOption}
                                option1='Default'
                                option2='ColorPicker'
                            />

                            {colorOption === 'ColorPicker' &&
                                <div className="h-[4rem] lg:w-[40%] w-full flex items-center justify-center">
                                    <input
                                        type="color"
                                        className='color-picker'
                                        onChange={(e) => updateForm('color', GetColorName((e.target as HTMLInputElement).value))}
                                    />
                                </div>}

                            {colorOption === 'Default' &&
                                <div className="flex gap-[1%] flex-wrap mt-[3%]">
                                    {colors.map(color => {

                                        const target = formData.color === color.colorName;

                                        return (
                                            <button
                                                key={color.hex}
                                                className={[color.tailwind, 'w-[2rem] h-[2rem] mt-[1.5%] rounded-full cursor-pointer hover:scale-[1.2] duration-100'].join(' ')}
                                                onClick={e => updateForm('color', (e.target as HTMLButtonElement).value)}
                                                type='button'
                                                value={color.colorName}
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

                        <CustomButtonGroup
                            state={styleOption}
                            setState={setStyleOption}
                            option1="icon"
                            option2="Logo"
                        />

                        {styleOption === 'icon' &&

                            <div className="flex gap-[3%] flex-wrap mt-[2%] mb-[8%]">
                                {iconStyles.map(style => {

                                    const target = formData.style === style.prompt

                                    return (
                                        <StyleOption
                                            key={style.id}
                                            style={style.style}
                                            prompt={style.prompt}
                                            selected={target}
                                            styleDemo={style.src}
                                            handleClick={e => updateForm('style', (e.target as HTMLButtonElement).value)}
                                        />
                                    )
                                })}
                            </div>}

                        {styleOption === 'Logo' &&
                            <>
                                <div className="flex gap-[3%] flex-wrap mt-[2%] mb-[8%]">
                                    {logoStyles.map(style => {

                                        const target = formData.style === style.prompt

                                        return (
                                            <StyleOption
                                                key={style.id}
                                                style={style.style}
                                                prompt={style.prompt}
                                                selected={target}
                                                styleDemo={style.src}
                                                handleClick={e => updateForm('style', (e.target as HTMLButtonElement).value)}
                                            />
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </section>

                    {styleOption === 'icon' &&
                        <section className="my-[5%]">
                            <FormLabel
                                label="Face orientation"
                            />
                            <Select
                                value={formData.orientation}
                                label="Age"
                                fullWidth
                                variant="standard"
                                onChange={(e: SelectChangeEvent) => updateForm('orientation', e.target.value)}
                                style={{ color: 'white' }}
                            >
                                <MenuItem value={'center portrait'}>Center</MenuItem>
                                <MenuItem value={'side-face'}>Side Face</MenuItem>
                                <MenuItem value={'close-up'}>Close-up</MenuItem>
                            </Select>
                        </section>}

                    <section>
                        <FormLabel
                            label="Number of images"
                        />
                        <label className="block text-[1rem] text-gray-400 mb-[1%]">1 credit per image</label>
                        <Tooltip title={'Currently only support 1 generation at a time'}>
                            <input
                                className="w-full lg:h-[2rem] p-[2%] mb-[5%] rounded bg-gray-700 text-white focus:outline-[transparent]"
                                onChange={e => updateForm('n', e.target.value)}
                                type="number"
                                disabled
                                min={1}
                                max={9}
                                defaultValue={defaultNumberOfImages} />
                        </Tooltip>
                    </section>

                    {isLoggedIn ?
                        <Button
                            disabled={formData.loading}>
                            {formData.loading ? 'Processing ...' : 'Generate'}
                        </Button>
                        :
                        <>
                            <Alert variant="outlined" severity="info" style={{ color: 'white' }}>
                                Quick sign-in to get 5 free credits!
                            </Alert>

                            <div role="spacer" className="my-[3%]" />

                            <Button
                                type="button"
                                onClick={() => { signIn().catch(console.error) }}
                                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-gray-100 p-[2%] px-[3%] rounded">
                                Get Started
                            </Button>
                        </>
                    }

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
            {error.promotion &&
                <Alert
                    // onClose={() => { setError(prev => ({ ...prev, promotion: false })) }}
                    onClick={() => push('/purchase')}
                    variant="filled"
                    severity="info"
                    style={{ color: 'white', position: 'fixed', top: '10%', right: '2%', backgroundColor: '#71A2F6', cursor: 'pointer' }}>
                    Get 160 generations with 38% off for limited time
                </Alert>}
        </>
    )
}

export default Generate
