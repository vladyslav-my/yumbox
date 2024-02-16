import { FC, memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { navModel } from "../model/navModel";
import cls from "./Nav.module.scss";

interface NavProps {
	className?: string;
	modifier?: NavModifier;
}

export enum NavModifier {
	MOBILE = "Nav_mobile",
	DESKTOP = "Nav_desktop",
}

export const Nav: FC<NavProps> = memo(({ className, modifier = NavModifier.DESKTOP }) => {
	const navItems = useMemo(() => (
		navModel.map(({ id, name, to }) => (
			<li className={cls.Nav__item} key={id}>
				<NavLink className={cls.Nav__link} to={to}>{name}</NavLink>
			</li>
		), [])
	), []);

	return (
		<nav className={cn(cls.Nav, {}, [className, cls[modifier]])}>
			<ul className={cls.Nav__list}>
				{navItems}
			</ul>
		</nav>
	);
});
