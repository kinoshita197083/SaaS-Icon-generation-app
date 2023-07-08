import styles from './button.module.css';

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    boxShadow?: boolean,
    bgColor?: string,
    borderColor?: string,
    textColor?: string
}

const Button = (props: ButtonProps) => {

    const { boxShadow, bgColor, borderColor, textColor, ...rest } = props;

    const btnStyle = {
        backgroundColor: bgColor,
        border: borderColor ? `solid 1px ${borderColor}` : 'none',
        color: textColor,
    }

    return (
        <button className='btn' {...rest} style={btnStyle} />
    )
}

export default Button
