// store.js
import { configureStore } from "@reduxjs/toolkit";
import { priceApi } from "../entities/stock/api/priceApi";

export const store = configureStore({
	reducer: {
		[priceApi.reducerPath]: priceApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(priceApi.middleware),
});
