import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { cartFeatureSlice } from "@/features/Cart";
import { headerMenuSlice } from "@/features/HeaderMenu";
import { cartEntitySlice } from "@/entities/Cart";
import { productSlice } from "@/entities/Product";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { ExtraArgumentType } from "./StateSchema";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		cartFeatureSlice,
		cartEntitySlice,
		productSlice,
		headerMenuSlice,
	);

	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		// @ts-ignore
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
		}).concat(rtkApi.middleware),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
