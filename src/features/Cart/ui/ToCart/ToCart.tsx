import { FC, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { cartEntityActions, cartEntitySelectors } from "@/entities/Cart";
import { Button } from "@/shared/Button/Button";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import SuccessIcon from "../../assets/success.svg";
import { cartFeatureActions } from "../../model/slice/cartFeatureSlice";
import cls from "./ToCart.module.scss";

interface ToCartProps {
	className?: string;
	count: string;
	price: string;
	id: number;
}

export const ToCart: FC<ToCartProps> = ({
	className, count, price, id,
}) => {
	const dispatch = useAppDispatch();
	const data = useSelector(cartEntitySelectors.data);
	const onClick = useCallback(() => {
		dispatch(cartFeatureActions.setIsOpen(true));
	}, [dispatch]);

	const cartItemValue = useMemo(() => {
		const cartItem = data.find((item) => item.product.id === id);

		if (cartItem) {
			const totalPrice = parseInt(cartItem.product.price) * cartItem.count;
			return { totalPrice, count: cartItem.count };
		}

		return null;
	}, [data, id]);

	return (
		<Button className={cn(cls.ToCart, {}, [className])} onClick={onClick}>
			<SuccessIcon className={cls.ToCart__icon} />
			<span className={cls.ToCart__text}>
				В кошику <b className={cls.ToCart__bold}>{cartItemValue?.count} шт</b> за <b className={cls.ToCart__bold}>{cartItemValue?.totalPrice} грн</b>
			</span>
		</Button>
	);
};
