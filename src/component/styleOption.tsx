import { Tooltip } from '@mui/material'
import React, { MouseEventHandler } from 'react'

type StyleOptionProps = {
    style: string,
    prompt: string,
    selected: boolean,
    styleDemo: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

const StyleOption = (props: StyleOptionProps) => {

    const { style, selected, prompt, styleDemo, handleClick } = props;

    return (
        <Tooltip title={style}>
            <button
                className="aspect-square lg:w-[6rem] lg:h-[6rem] w-[5rem] h-[5rem] mt-[2.5%] border rounded cursor-pointer hover:scale-[1.2] duration-100"
                onClick={handleClick}
                style={{ background: `url(${styleDemo}) no-repeat center`, backgroundSize: 'cover', border: selected ? '2px solid white' : '', transform: selected ? 'scale(1.2)' : '' }}
                type='button'
                value={prompt}
            />
        </Tooltip>
    )
}

export default StyleOption
