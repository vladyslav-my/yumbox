import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { ViewCart } from "@/features/Cart";
import { AddressList } from "@/entities/AddressList";
import { Nav, NavModifier } from "@/entities/Nav";
import { SocialNetworkList } from "@/entities/SocialNetworkList";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Overlay } from "@/shared/ui/Overlay";
import { Portal } from "@/shared/ui/Portal";
import { headerMenuActions, headerMenuSelectors } from "../../model/slice/headerMenuSlice";
import cls from "./HeaderMenu.module.scss";

interface HeaderMenuProps {
	className?: string
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const isOpen = useSelector(headerMenuSelectors.isOpen);

	const onClickClose = useCallback(() => {
		dispatch(headerMenuActions.setIsOpen(false));
	}, [dispatch]);

	return (
		<Portal>
			<div className={cn(cls.HeaderMenu, {
				[cls.HeaderMenu_open]: isOpen,
			}, [className])}
			>
				<div className={cls.HeaderMenu__scrollContainer}>
					<ViewCart className={cls.HeaderMenu__viewCart} />
					<Nav className={cls.HeaderMenu__nav} modifier={NavModifier.MOBILE} />
					<AddressList className={cls.HeaderMenu__addressList} />
					<SocialNetworkList className={cls.HeaderMenu__socialNetworkList} />
				</div>

			</div>
			{isOpen && <Overlay onClick={onClickClose} />}
		</Portal>
	);
};
