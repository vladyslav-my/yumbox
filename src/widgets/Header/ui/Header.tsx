import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { CartMenu, ViewCart } from "@/features/Cart";
import { BurgerButton, HeaderMenu } from "@/features/HeaderMenu";
import { Nav } from "@/entities/Nav";
import { Devices } from "@/shared/const/common";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	return (
		<header className={classNames(cls.Header, {}, [className])}>
			<Container className={cls.Header__container}>
				<Logo />
				{!isTablet && <Nav />}
				{!isTablet && <ViewCart className={cls.Header__viewCart} />}
				{isTablet && <BurgerButton />}
			</Container>
			<CartMenu />
			<HeaderMenu />
		</header>
	);
};
