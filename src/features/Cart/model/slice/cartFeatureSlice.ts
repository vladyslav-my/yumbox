import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { CartSchema } from "../types/CartSchema";

const initialState: CartSchema = {
	isOpen: false,

};

export const cartFeatureSlice = createSliceWithThunk({
	name: "cartFeature",
	initialState,
	reducers: (create) => ({
		setIsOpen: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		}),
	}),

	selectors: {
		getIsOpen: (state) => state.isOpen,
	},
});

export const { actions: cartFeatureActions } = cartFeatureSlice;
export const { selectors: cartFeatureSelectors } = cartFeatureSlice;
