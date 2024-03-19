import {
	FC, memo, useCallback, useEffect, useMemo, useState,
} from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
	cartEntityActions, cartEntitySelectors, CartItem,
} from "@/entities/Cart";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebaunce/useDebaunce";
import { Overlay } from "@/shared/ui/Overlay";
import { PageLoader } from "@/shared/ui/PageLoader";
import { Portal } from "@/shared/ui/Portal";
import AddIcon from "../../assets/add.svg";
import { cartFeatureActions, cartFeatureSelectors } from "../../model/slice/cartFeatureSlice";
import cls from "./CartMenu.module.scss";

interface CartMenuProps {
	className?: string
}

export const CartMenu: FC<CartMenuProps> = memo(({ className }) => {
	const isOpen = useSelector(cartFeatureSelectors.getIsOpen);
	const dispatch = useAppDispatch();
	const debaunced = useDebounce();
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });
	const [isDiscount, setIsDiscount] = useState(false);

	const data = useSelector(cartEntitySelectors.data);
	const isLoading = useSelector(cartEntitySelectors.isLoading);
	const isError = useSelector(cartEntitySelectors.isError);
	const [scrollPosition, setScrollPosition] = useState(0);

	const onClickCloseMenu = useCallback(() => {
		dispatch(cartFeatureActions.setIsOpen(false));
	}, [dispatch]);

	useEffect(() => {
		// @ts-ignore
		dispatch(cartEntityActions.fetchCart());
	}, [dispatch]);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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

	const getIndexCartItemById = useCallback((id: number) => {
		return data.findIndex((cartItem) => cartItem.id === id);
	}, [data]);

	const cartTotalPrice = useMemo(() => {
		const totalPrice = data.reduce((a, b) => (a + +b.product.price * b.count), 0);

		if (totalPrice > 1000) {
			setIsDiscount(true);
		} else {
			setIsDiscount(false);
		}

		return { discount: Math.round(totalPrice * 0.90), total: totalPrice };
	}, [data]);

	const onClickCount = useCallback(({ id, count }: { id: number, count: number }) => () => {
		const cartItemId = getIndexCartItemById(id);
		dispatch(cartEntityActions.setCountById({ id, count: data[cartItemId].count + count }));
		// @ts-ignore
		debaunced(() => dispatch(cartEntityActions.updateResourceCart(id)), 500);
	}, [data, debaunced, dispatch, getIndexCartItemById]);

	const onClickRemove = useCallback((id: number) => () => {
		dispatch(cartEntityActions.removeCartItemCash(id));
		// @ts-ignore
		dispatch(cartEntityActions.removeCartItemSever(id));
	}, [dispatch]);

	const onClickClose = useCallback(() => {
		dispatch(cartFeatureActions.setIsOpen(false));
	}, [dispatch]);

	const onClickOrder = useCallback(() => {
		console.log(data);
	}, [data]);

	const cartsItems = useMemo(() => {
		return data.map(({
			id, count, product: {
				alt, name, price, setNumber, src, weight,
			},
		}) => {
			return (
				<CartItem
					key={id}
					src={src}
					alt={alt}
					name={name}
					price={price}
					setNumber={setNumber}
					weight={weight}
					onClickRemove={onClickRemove(id)}
					onClickMinus={onClickCount({ id, count: -1 })}
					onClickPlus={onClickCount({ id, count: 1 })}
					count={count}
				/>
			);
		});
	}, [data, onClickCount, onClickRemove]);

	const headerHeight = useMemo(() => {
		return isTablet ? 84.98 : 129.77 + 21;
	}, [isTablet]);

	return (
		<Portal>
			<aside
				style={{ paddingTop: `${Math.max(33, headerHeight - scrollPosition)}px` }}
				className={cn(cls.CartMenu, {
					[cls.CartMenu_open]: isOpen,
				}, [className])}
			>
				<div className={cls.CartMenu__top}>
					<h2 className={cls.CartMenu__title}>Корзина</h2>
					<button onClick={onClickClose} className={cls.CartMenu__close}>
						<AddIcon className={cls.CartMenu__closeIcon} />
					</button>
				</div>
				<ul className={cls.CartMenu__list}>
					{isLoading && !data ? <PageLoader /> : cartsItems}
					{!data.length && (
						<li style={{
							display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
						}}
						>Немає товарів у кошику
						</li>
					) }
				</ul>
				<div className={cn(cls.Delivery, {
					[cls.Delivery_discount]: isDiscount,
				}, [cls.CartMenu__delivery])}
				>
					<div className={cls.Delivery__titleBox}>
						<h4 className={cls.Delivery__title}>Доставка</h4>
						<span className={cls.Delivery__price}>50 ₴</span>
					</div>

					<button onClick={onClickOrder} className={cls.Delivery__button}>
						<span className={cls.Delivery__text}>оформити за </span> <span className={cls.Delivery__totalPrice}>{cartTotalPrice.total} ₴</span>
						{isDiscount && <span className={cls.Delivery__discountPrice}> {cartTotalPrice.discount} ₴</span>}
					</button>
				</div>
				{isOpen && <Overlay onClick={onClickCloseMenu} />}
			</aside>
		</Portal>

	);
});
