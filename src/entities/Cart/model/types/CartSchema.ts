export interface CartSchema {
	data: CartData[],
	isLoading: boolean,
	isError: boolean,
}

export interface CartData {
	count: number;
	id: number;
	product: ProductData,
}

export interface ProductData {
	id: number;
	src: string,
	alt: string,
	price: string,
	weight: string,
	name: string,
	setNumber: string
}
