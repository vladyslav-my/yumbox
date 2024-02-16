import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { ProductData, ProductSchema } from "../types/ProductSchema";

const initialState: ProductSchema = {
	data: [],
	isLoading: true,
	isError: false,
};

export const productSlice = createSliceWithThunk({
	name: "product",
	initialState,
	reducers: (create) => ({
		fetchProduct: create.asyncThunk<any, void, ThunkConfig<string>>(
			async (_, {
				extra,
			}) => {
				const response = await extra.api.get<ProductData>("/products");

				return response.data;
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.data = action.payload;
				},
				rejected: (state) => {
					state.isLoading = false;
					state.isError = true;
				},
			},
		),
	}),
	selectors: {
		isLoading: (state) => state.isLoading,
		data: (state) => state.data,
		isError: (state) => state.isError,
	},
});

export const { actions: productActions } = productSlice;
export const { selectors: productSelectors } = productSlice;
