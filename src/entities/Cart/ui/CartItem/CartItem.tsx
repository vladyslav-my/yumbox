import { FC, memo } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Counter } from "@/shared/ui/Counter";
import RemoveIcon from "../../assets/remove.svg";
import cls from "./CartItem.module.scss";

interface CartItemProps {
	className?: string;
	name: string;
	setNumber: string;
	alt: string;
	src: string;
	weight: string;
	price: string;
	onClickRemove: () => void;
	onClickMinus: () => void;
	onClickPlus: () => void;
	count: number;
}

export const CartItem: FC<CartItemProps> = memo(({
	className, name, alt, src, weight, price, onClickRemove, onClickMinus, onClickPlus, setNumber, count,
}) => {
	return (
		<li className={cn(cls.CartItem, {}, [className])}>
			<div>
				<div className={cls.CartItem__top}>
					<img className={cls.CartItem__image} src={src} alt={alt} />
					<div className={cls.CartItem__product}>
						<h3 className={cls.CartItem__title}>
							{name} {setNumber} сет
						</h3>
						<span className={cls.CartItem__weight}>
							{weight} гр
						</span>
					</div>
					<button onClick={onClickRemove} className={cls.CartItem__removeButton}>
						<RemoveIcon className={cls.CartItem__removeIcon} />
					</button>
				</div>
				<hr className={cls.CartItem__line} />
				<div className={cls.CartItem__bottom}>
					<span className={cls.CartItem__price}>{parseInt(price) * count} ₴</span>
					<Counter
						count={count}
						onClickMinus={onClickMinus}
						onClickPlus={onClickPlus}
					/>
				</div>
			</div>
		</li>
	);
});
