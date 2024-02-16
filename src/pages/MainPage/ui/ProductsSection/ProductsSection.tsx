import {
	FC, memo, useCallback, useEffect, useMemo,
} from "react";
import { useSelector } from "react-redux";
import { AddToCart, ToCart } from "@/features/Cart";
import { cartEntitySelectors } from "@/entities/Cart";
import { productSelectors, ProductItem, productActions } from "@/entities/Product";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./ProductsSection.module.scss";

interface ProductsSectionProps {
	className?: string
}

export const ProductsSection: FC<ProductsSectionProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const productData = useSelector(productSelectors.data);
	const cartData = useSelector(cartEntitySelectors.data);
	const isLoading = useSelector(productSelectors.isLoading);
	const isError = useSelector(productSelectors.isError);

	useEffect(() => {
		// @ts-ignore
		dispatch(productActions.fetchProduct());
	}, []);

	const productsItem = useMemo(() => {
		return productData.map(({
			id, src, alt, name, price, setNumber, weight,
		}) => {
			const cartItem = cartData.filter((item) => item.product.id === id).length;

			return (
				<ProductItem
					key={id}
					id={id}
					src={src}
					alt={alt}
					setNumber={setNumber}
					weight={weight}
					price={price}
					name={name}
					isCart={!!cartItem}
					AddToCartSlot={AddToCart}
					ToCartSlot={ToCart}
				/>
			);
		});
	}, [cartData, productData]);

	if (!productData && isLoading) {
		return <PageLoader />;
	}

	if (isError) {
		return <div>Сталася помилка</div>;
	}

	return (
		<section className={cn(cls.ProductsSection, {}, [className])}>
			<Container className={cls.ProductsSection__container}>
				<h2 className={cls.ProductsSection__title}>Найчастіше замовляють</h2>
				<ul className={cls.ProductsSection__list}>
					{productsItem}
				</ul>
			</Container>

		</section>
	);
});
