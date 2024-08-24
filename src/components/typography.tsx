import { FC } from "react";
import { VariantType } from "./types";

type TypographyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & VariantType;

const Typography: FC<TypographyProps> = (props) => {
  const { children, className, variant = "primary", ...otherProps } = props;
  const colors = variant === "primary" ?  "text-primary-900" : "text-secondary-600"
  return (
    <div
      {...otherProps}
      className={ `${colors} my-2 ${className}`}
    >
      {children}
    </div>
  )
}

export default Typography