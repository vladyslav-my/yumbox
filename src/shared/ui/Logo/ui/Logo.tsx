import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { getMainRoutePath } from "../../../config/routes/path";
import { classNames as cn } from "../../../lib/classNames/classNames";
import LogoIcon from "../assets/logoIcon.svg";
import cls from "./Logo.module.scss";

interface LogoProps {
	className?: string;
}

export const Logo: FC<LogoProps> = memo(({ className }) => {
	return (
		<NavLink
			className={cn(cls.Logo, {}, [className])}
			to={getMainRoutePath()}
		>
			<LogoIcon className={cls.Logo__icon} />
		</NavLink>
	);
});
