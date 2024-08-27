import { FC } from "react";
import { VariantType } from "./types";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & VariantType;

const Button: FC<ButtonProps> = (props) => {
  const { children, className, variant = "primary", ...otherProps } = props;
  const colors = variant === "primary" ?  "bg-background-400 text-primary-900 active:bg-background-500" : "bg-secondary-400 text-secondary-900 active:bg-secondary-500"
  return (
    <button
      {...otherProps}
      className={ `${colors} text-secondary-900 rounded-md px-4 py-2 disabled:bg-slate-500 disabled:text-slate-100 disabled:cursor-default ${className}`}
    >{children}</button>
  )
}

export default Button