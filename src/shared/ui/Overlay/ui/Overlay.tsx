import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { classNames as cn } from "../../../lib/classNames/classNames";
import { Portal } from "../../Portal";
import cls from "./Overlay.module.scss";

interface OverlayProps {
	className?: string;
	onClick: () => void;
	isActive: boolean;
}

export const Overlay: FC<OverlayProps> = ({ className, onClick, isActive }) => {
	return (
		<Portal>
			<div
				onClick={onClick}
				className={cn(cls.Overlay, {
					[cls.Overlay_active]: isActive,
				}, [className])}
			/>
		</Portal>
	);
};
