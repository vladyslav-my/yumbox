import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartFeatureActions, cartFeatureSelectors } from "@/features/Cart/model/slice/cartFeatureSlice";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { headerMenuActions, headerMenuSelectors } from "../../model/slice/headerMenuSlice";
import cls from "./BurgerButton.module.scss";

interface BurgerButtonProps {
	className?: string
}

export const BurgerButton: FC<BurgerButtonProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const isOpenHeaderMenu = useSelector(headerMenuSelectors.isOpen);
	const isOpenCart = useSelector(cartFeatureSelectors.getIsOpen);

	const onClickHandler = useCallback(() => {
		dispatch(headerMenuActions.setIsOpen(!isOpenHeaderMenu));

		if (isOpenCart) {
			dispatch(cartFeatureActions.setIsOpen(false));
		}

		dispatch(cartFeatureActions.setIsOpen(false));
	}, [dispatch, isOpenCart, isOpenHeaderMenu]);

	useEffect(() => {
		if (isOpenHeaderMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpenHeaderMenu]);

	return (
		<button
			onClick={onClickHandler}
			className={cn(cls.BurgerButton, {
				[cls.BurgerButton_opened]: isOpenHeaderMenu,
			}, [className])}
		>
			<span className={cls.BurgerButton__text}>Меню</span>
			<div className={cls.BurgerButton__this}>
				<span className={cls.BurgerButton__item} />
			</div>

		</button>
	);
};
