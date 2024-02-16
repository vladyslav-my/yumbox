import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./ProductItem.module.scss";

interface ProductItemProps {
	className?: string;
	src: string;
	alt: string;
	name: string;
	setNumber: string;
	weight: string;
	id: number;
	AddToCartSlot: FC<any>,
	ToCartSlot: FC<any>,
	isCart: boolean;
	price: string;
}

export const ProductItem: FC<ProductItemProps> = ({
	className, src, alt, name, setNumber, weight, id, AddToCartSlot, ToCartSlot, isCart, price,
}) => {
	return (
		<li className={cn(cls.ProductItem, {}, [className])}>
			<article className={cls.ProductItem__article}>
				<img className={cls.ProductItem__image} src={src} alt={alt} />
				<h2 className={cls.ProductItem__title}>
					<span className={cls.ProductItem__name}>{name}</span>
					<span className={cls.ProductItem__setNumber}>{setNumber} сет</span>
				</h2>
				<span className={cls.ProductItem__weight}>{weight} гр</span>
				{
					isCart
						? <ToCartSlot id={id} className={cls.ProductItem__button} />
						: <AddToCartSlot id={id} className={cls.ProductItem__button} price={price} />
				}
			</article>
		</li>
	);
};
