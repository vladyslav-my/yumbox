import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartEntityActions, cartEntitySelectors } from "@/entities/Cart";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./AddToCart.module.scss";

interface AddToCartProps {
	className?: string;
	price: number;
	id: number;
}

export const AddToCart: FC<AddToCartProps> = ({ className, price, id }) => {
	const dispatch = useDispatch();
	const data = useSelector(cartEntitySelectors.data);
	const onClick = useCallback(() => {
		const cartItem = data.filter((item) => item.product.id === id);
		if (!cartItem.length) {
			// @ts-ignore
			dispatch(cartEntityActions.addCartItemSever(id));
			// @ts-ignore
			dispatch(cartEntityActions.fetchCart(id));
		}
	}, [data, dispatch, id]);

	return (
		<button onClick={onClick} className={cn(cls.AddToCart, {}, [className])}>
			<span className={cls.AddToCart__price}>{price} грн</span>
			<span className={cls.AddToCart__add}>Добавити в кошик</span>
		</button>
	);
};
