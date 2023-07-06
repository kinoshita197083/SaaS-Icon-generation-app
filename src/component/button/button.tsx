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
        border: `solid 1px ${borderColor}`,
        color: textColor,
        boxShadow: boxShadow ? 'box-shadow: 0px 5px 11px black' : '',
    }

    return (
        <button className={styles.xlButton} {...rest} style={btnStyle} />
    )
}

export default Button
