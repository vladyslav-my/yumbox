import { FC } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import { Portal } from "../../Portal";
import cls from "./Overlay.module.scss";

interface OverlayProps {
	className?: string;
	onClick: () => void;
}

export const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
	return (
		<Portal>
			<div onClick={onClick} className={cn(cls.Overlay, {}, [className])} />
		</Portal>
	);
};
