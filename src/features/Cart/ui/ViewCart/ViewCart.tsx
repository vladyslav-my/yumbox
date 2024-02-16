import {
	FC, memo, useCallback, useMemo,
} from "react";
import { useSelector } from "react-redux";
import { cartEntitySelectors } from "@/entities/Cart";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { cartFeatureActions, cartFeatureSelectors } from "../../model/slice/cartFeatureSlice";
import cls from "./ViewCart.module.scss";

interface ViewCartProps {
	className?: string
}

export const ViewCart: FC<ViewCartProps> = memo(({ className }) => {
	const data = useSelector(cartEntitySelectors.data);
	const isOpen = useSelector(cartFeatureSelectors.getIsOpen);

	const cartStats = useMemo(() => {
		return data.reduce(
			(a, b) => ({ total: a.total + parseInt(b.product.price) * b.count, count: b.count + a.count }),
			{ total: 0, count: 0 },
		);
	}, [data]);

	const dispatch = useAppDispatch();
	const onClick = useCallback(() => {
		dispatch(cartFeatureActions.setIsOpen(!isOpen));
	}, [dispatch, isOpen]);

	return (
		<button onClick={onClick} className={cn(cls.ViewCart, {}, [className])}>
			<span className={cls.ViewCart__count}>{cartStats.count}</span>
			<span className={cls.ViewCart__price}>{cartStats.total}</span>
		</button>
	);
});
