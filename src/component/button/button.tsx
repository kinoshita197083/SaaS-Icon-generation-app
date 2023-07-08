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
        // boxShadow: boxShadow ? '0px 5px 11px black' : '',
    }

    return (
        <button {...rest} style={btnStyle} />
    )
}

export default Button
