import {
	FC, memo, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import DecorateIcon from "../../assets/decorate.svg";
import LogoMobileIcon from "../../assets/logo-mobile.svg";
import LogoPcIcon from "../../assets/logo-pc.svg";
import { Button } from "../Button/Button";
import cls from "./Carrousel.module.scss";

interface CarrouselProps {
	className?: string;
	data: { setNumber: number, price: number, src: string, alt: string }[];
}

export const Carrousel: FC<CarrouselProps> = memo(({
	className, data,
}) => {
	const listRef = useRef<HTMLUListElement>(null);
	const [maxIndexItem, setMaxIndexItem] = useState(0);
	const [currentIndexItem, setCurrentIndexItem] = useState(0);
	const [isShowLeftButton, setIsShowLeftButton] = useState(false);
	const [isShowRightButton, setIsShowRightButton] = useState(false);
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	useEffect(() => {
		if (listRef.current) {
			setMaxIndexItem(listRef.current.children.length - 1);
		}
	}, []);

	useEffect(() => {
		if (listRef.current) {
			// @ts-ignore
			const itemWidth = listRef.current.children[currentIndexItem].offsetLeft - listRef.current.offsetLeft;
			listRef.current.scrollTo({
				left: itemWidth,
				behavior: "smooth",
			});

			const { clientWidth, scrollWidth } = listRef.current;
			const scrollWidthPassed = itemWidth + clientWidth;
			if (scrollWidthPassed >= scrollWidth) {
				setIsShowRightButton(false);
			} else {
				setIsShowRightButton(true);
			}
		}

		if (currentIndexItem === 0) {
			setIsShowLeftButton(false);
		} else {
			setIsShowLeftButton(true);
		}
	}, [currentIndexItem]);

	const onClickHandlerLeft = useCallback(() => {
		setCurrentIndexItem((prev) => prev - 1);
	}, []);

	const onClickHandlerRight = useCallback(() => {
		setCurrentIndexItem((prev) => prev + 1);
	}, []);

	const onClickDotHandler = useCallback((index: number) => () => {
		setCurrentIndexItem(index);
	}, []);

	const dotsItems = useMemo(() => {
		return new Array(maxIndexItem + 1).fill(undefined).map((_, i) => {
			return (
				<li
					key={i}
					className={cn(cls.Carrousel__dotItem, {
						[cls.Carrousel__dotItem_active]: i === currentIndexItem,
					})}
					onClick={onClickDotHandler(i)}
				/>
			);
		}, []);
	}, [currentIndexItem, maxIndexItem, onClickDotHandler]);

	const ArrowButtonLeft = useMemo(() => {
		if (!isShowLeftButton) {
			return null;
		}

		return <Button className={cls.Carrousel__buttonLeft} onClick={onClickHandlerLeft} />;
	}, [isShowLeftButton, onClickHandlerLeft]);

	const ArrowButtonRight = useMemo(() => {
		if (!isShowRightButton) {
			return null;
		}

		return (
			<Button
				className={cls.Carrousel__buttonRight}
				onClick={onClickHandlerRight}
				right
			/>
		);
	}, [isShowRightButton, onClickHandlerRight]);

	const carrouselItems = useMemo(() => {
		return data.map(({
			setNumber, price, src, alt,
		}) => {
			return 				(
				<li className={cls.Carrousel__carrouselItem}>
					<img className={cls.Carrousel__image} src={src} alt={alt || "slide"} />
					<div className={cn(cls.ProductInfo, {}, [cls.Carrousel__productInfo])}>
						<span className={cls.ProductInfo__setNumber}>
							CЕТ {setNumber}
						</span>
						<span className={cls.ProductInfo__price}>
							{price} грн
						</span>
					</div>
				</li>
			);
		}, []);
	}, [data]);

	return (
		<div className={cn(cls.Carrousel, {
		}, [className])}
		>
			<div className={cls.Carrousel__listWrapper}>
				{!isTablet && ArrowButtonLeft}
				{!isTablet && ArrowButtonRight}
				{!isTablet && <DecorateIcon className={cls.Carrousel__decorate} />}
				{!isTablet && <LogoPcIcon className={cls.Carrousel__logo} />}
				{isTablet && <LogoMobileIcon className={cls.Carrousel__logo} />}
				<ul ref={listRef} className={cls.Carrousel__carrouselList}>
					{carrouselItems}
				</ul>
			</div>
			<div className={cls.Carrousel__navWrapper}>
				{isTablet && ArrowButtonLeft}
				<ul className={cls.Carrousel__dotsList}>
					{dotsItems}
				</ul>
				{isTablet && ArrowButtonRight}
			</div>
		</div>
	);
});
