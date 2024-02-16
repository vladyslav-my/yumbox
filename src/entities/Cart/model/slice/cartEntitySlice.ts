import { PayloadAction } from "@reduxjs/toolkit";
import { RootState, ThunkConfig, store } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { CartSchema } from "../types/CartSchema";

const initialState: CartSchema = {
	data: [],
	isLoading: true,
	isError: false,
};

export const cartEntitySlice = createSliceWithThunk({
	name: "cartEntity",
	initialState,
	reducers: (create) => ({
		setCountById: create.reducer((state, action: PayloadAction<{ id: number, count: number }>) => {
			const index = state.data.findIndex((cart) => cart.id === action.payload.id);
			if (!(action.payload.count < 1)) {
				state.data[index].count = action.payload.count;
			}
		}),
		fetchCart: create.asyncThunk<void, void, ThunkConfig<string>>(
			async (_, {
				extra,
			}) => {
				const response = await extra.api.get("/carts", {
					params: {
						_expand: "product",
					},
				});

				return response.data;
			},
			{
				pending: (state) => {
					state.isLoading = true;
				},
				fulfilled: (state, action: any) => {
					state.isLoading = false;
					state.data = action.payload;
				},
				rejected: (state) => {
					state.isLoading = false;
					state.isError = true;
				},
			},
		),
		updateResourceCart: create.asyncThunk<void, number, ThunkConfig<string>>(
			async (id, {
				extra, getState,
			}) => {
				// @ts-ignore
				const data = getState().cartEntity.data.find((carts) => carts.id === id);

				const response = await extra.api.patch(`/carts/${id}`, { count: data.count });

				return response.data;
			},
			{
				rejected: (state) => {
					state.isLoading = false;
					state.isError = true;
				},
			},
		),
		removeCartItemCash: create.reducer((state, action: PayloadAction<number>) => {
			const indexToRemove = state.data.findIndex((cart) => cart.id === action.payload);
			state.data.splice(indexToRemove, 1);
		}),
		removeCartItemSever: create.asyncThunk<void, number, ThunkConfig<string>>(
			async (id, {
				extra,
			}) => {
				const response = await extra.api.delete(`/carts/${id}`);

				return response.data;
			},
			{
				rejected: (state) => {
					state.isLoading = false;
					state.isError = true;
				},
			},
		),
		// addCartCash: create.reducer((state, action: PayloadAction<number>) => {
		// 	const product = store.getState().product.data.filter((product) => product.id === action.payload);
		// 	state.data.push({
		// 		count: 1,
		// 		product,
		// 	});
		// }),

		addCartItemSever: create.asyncThunk<void, number, ThunkConfig<string>>(
			async (id, {
				extra,
			}) => {
				const response = await extra.api.post("/carts", {
					count: 1,
					productId: id,
				});

				return response.data;
			},
			{
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

export const { actions: cartEntityActions } = cartEntitySlice;
export const { selectors: cartEntitySelectors } = cartEntitySlice;
