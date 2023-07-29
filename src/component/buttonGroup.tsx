import React, { Dispatch } from 'react'

type ButtonGroupProps = {
    state: string,
    setState: Dispatch<React.SetStateAction<string>>
    option1: string,
    option2: string,
}

const CustomButtonGroup = (props: ButtonGroupProps) => {

    const { state, setState, option1, option2 } = props;

    return (
        <div role="button-group"
            className="flex my-[5%]"
        >
            <button type="button"
                className={["lg:w-[20%] w-[50%] text-gray-100 transition-all", state === option1 ? 'border-b-4 border-indigo-500' : 'border-b-4 border-gray-700'].join(' ')}
                onClick={() => setState(option1)}>
                {option1}
            </button>

            <button type="button"
                className={["lg:w-[20%] w-[50%] text-gray-100 transition-all", state === option2 ? 'border-b-4 border-indigo-500' : 'border-b-4 border-gray-700'].join(' ')}
                onClick={() => setState(option2)}>
                {option2}
            </button>
        </div>
    )
}

export default CustomButtonGroup
