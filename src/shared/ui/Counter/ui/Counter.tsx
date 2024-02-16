import { FC, memo } from "react";
import { classNames as cn } from "../../../lib/classNames/classNames";
import MinusIcon from "../assets/minus.svg";
import PlusIcon from "../assets/plus.svg";
import cls from "./Counter.module.scss";

interface CounterProps {
	className?: string;
	onClickPlus: () => void;
	onClickMinus: () => void;
	count?: number;
}

export const Counter: FC<CounterProps> = memo(({
	className, onClickPlus, onClickMinus, count,
}) => {
	return (
		<div className={cn(cls.Counter, {}, [className])}>
			<button onClick={onClickMinus} className={cls.Counter__minus}>
				<MinusIcon />
			</button>
			<span className={cls.Counter__count}>{count}</span>
			<button onClick={onClickPlus} className={cls.Counter__plus}>
				<PlusIcon />
			</button>
		</div>
	);
});
