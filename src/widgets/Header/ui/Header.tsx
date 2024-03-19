import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { CartMenu, ViewCart } from "@/features/Cart";
import {
	BurgerButton, HeaderMenu, headerMenuActions,
} from "@/features/HeaderMenu";
import { Nav } from "@/entities/Nav";
import { Devices } from "@/shared/const/common";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isTablet) {
			dispatch(headerMenuActions.setIsOpen(false));
		}
	}, [dispatch, isTablet]);

	return (
		<header className={classNames(cls.Header, {}, [className])}>
			<Container className={cls.Header__container}>
				<Logo className={cls.Header__logo} />
				{!isTablet && <Nav />}
				{!isTablet && <ViewCart className={cls.Header__viewCart} />}
				{isTablet && <BurgerButton />}
			</Container>
			<CartMenu />
			<HeaderMenu />
		</header>
	);
};
