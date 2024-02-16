import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Header } from "@/widgets/Header";
import { ViewCart } from "@/features/Cart";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { ProductsSection } from "../ProductsSection/ProductsSection";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });
	return (
		<div className={cn(cls.MainPage, {}, [className])}>
			<Header />
			<ProductsSection />
			{isTablet && <ViewCart className={cls.MainPage__viewCart} />}
		</div>
	);
};
