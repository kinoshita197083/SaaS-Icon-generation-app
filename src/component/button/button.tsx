import styles from './button.module.css';

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    boxShadow?: boolean,
    color?: string;
}

const Button = (props: ButtonProps) => {

    const { boxShadow, color, ...rest } = props;

    const condition = boxShadow ? 'button box-shadow' : 'button';

    return (
        <button className={boxShadow ? [styles.button, styles.boxShadow].join(" ") : styles.button} {...rest} style={{ backgroundColor: color }} />
    )
}

export default Button
