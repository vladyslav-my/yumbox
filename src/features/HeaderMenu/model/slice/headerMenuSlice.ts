import { createSlice } from "@reduxjs/toolkit";
import { HeaderMenuSchema } from "../types/HeaderMenuSchema";

const initialState: HeaderMenuSchema = {
	isOpen: false,
};

export const headerMenuSlice = createSlice({
	name: "headerMenu",
	initialState,
	reducers: {
		setIsOpen: (state, action) => {
			state.isOpen = action.payload;
		},
	},
	selectors: {
		isOpen: (state) => state.isOpen,
	},
});

export const { actions: headerMenuActions } = headerMenuSlice;
export const { selectors: headerMenuSelectors } = headerMenuSlice;
