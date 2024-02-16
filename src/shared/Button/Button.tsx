import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { classNames as cn } from "../lib/classNames/classNames";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	...otherProps
}) => (
	<button className={cn(cls.Button, {}, [className])} {...otherProps}>
		{children}
	</button>
);
