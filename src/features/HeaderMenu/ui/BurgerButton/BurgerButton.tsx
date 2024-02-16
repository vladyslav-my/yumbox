import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { headerMenuActions, headerMenuSelectors } from "../../model/slice/headerMenuSlice";
import cls from "./BurgerButton.module.scss";

interface BurgerButtonProps {
	className?: string
}

export const BurgerButton: FC<BurgerButtonProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const isOpen = useSelector(headerMenuSelectors.isOpen);

	const onClickHandler = useCallback(() => {
		dispatch(headerMenuActions.setIsOpen(!isOpen));
	}, [dispatch, isOpen]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<button
			onClick={onClickHandler}
			className={cn(cls.BurgerButton, {
				[cls.BurgerButton_opened]: isOpen,
			}, [className])}
		>
			<span className={cls.BurgerButton__text}>Меню</span>
			<div className={cls.BurgerButton__this}>
				<span className={cls.BurgerButton__item} />
			</div>

		</button>
	);
};
