import { FC } from "react";
import { Carrousel } from "@/features/Carrousel";
import { carrouselModel } from "@/entities/Carrousel";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import cls from "./CarrouselSection.module.scss";

interface CarrouselSectionProps {
	className?: string
}

export const CarrouselSection: FC<CarrouselSectionProps> = ({ className }) => {
	return (
		<section className={cn(cls.CarrouselSection, {}, [className])}>
			<Container>
				<Carrousel data={carrouselModel} />
			</Container>
		</section>
	);
};
