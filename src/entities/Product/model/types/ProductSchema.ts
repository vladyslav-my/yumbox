export interface ProductSchema {
	data: ProductData[];
	isLoading: boolean;
	isError: boolean;
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
