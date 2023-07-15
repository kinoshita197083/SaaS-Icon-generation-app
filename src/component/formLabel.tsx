import React from 'react'

type FormLabelProps = {
    label: string,
}

const labelCSS = 'text-gray-100 text-[1.3rem] block';

const FormLabel = (props: FormLabelProps) => {

    const { label } = props;

    return (
        <label className={labelCSS}>
            {label}
        </label>
    )
}

export default FormLabel
