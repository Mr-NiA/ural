import { useCallback, useEffect, useReducer, useState } from "react";
import { ERROR_TEXT } from "../api/constant";
import { useLazyGetPriceQuery } from "../api/priceApi";
import { normalizePriceResponse } from "../helpers/normalize";

const CLIENT_KEY = "00000000-0000-0000-0000-000000000001";
const DEBOUNCE_MS = 500;

/** @typedef {{ number: string, brand: string, withAnalogues: boolean }} SearchState */

const initialState = {
	number: "",
	brand: "",
	withAnalogues: false,
};

/** @param {SearchState} state @param {{type: string, payload?: any}} action */
function reducer(state, action) {
	switch (action.type) {
		case "number":
			return { ...state, number: action.payload };
		case "brand":
			return {
				...state,
				brand: action.payload,
				withAnalogues: action.payload?.trim?.() ? state.withAnalogues : false,
			};
		case "withAnalogues":
			return { ...state, withAnalogues: action.payload };
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

export function usePriceSearch() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [fetchPrice, { currentData, isFetching, error, isSuccess }] =
		useLazyGetPriceQuery();

	const [isRunning, setIsRunning] = useState(false);
	// Автозапрос с дебаунсом при изменении любого параметра
	useEffect(() => {
		const trimmedNumber = state.number?.trim?.();
		if (!trimmedNumber) return;

		setIsRunning(true);
		const timer = setTimeout(() => {
			const trimmedBrand = state.brand?.trim?.();
			fetchPrice({
				key: CLIENT_KEY,
				number: trimmedNumber,
				brand: trimmedBrand || undefined,
				analogues: state.withAnalogues && trimmedBrand ? "on" : undefined,
				info: "on",
			});
			setIsRunning(false);
		}, DEBOUNCE_MS);

		return () => {
			clearTimeout(timer);
		};
	}, [state.number, state.brand, state.withAnalogues, fetchPrice]);

	const result =
		currentData && state.number?.trim?.()
			? normalizePriceResponse(currentData)
			: null;

	const errorText = error
		? ERROR_TEXT[error?.data?.error] || "Ошибка сети. Попробуйте ещё раз."
		: null;

	const handleChangeFilter = useCallback(
		(type) => (e) => {
			const payload =
				type === "withAnalogues" ? e.target.checked : e.target.value;

			dispatch({ type, payload });
		},
		[],
	);

	const hasFilter = state.number?.trim?.();

	return {
		state,
		handleChangeFilter,
		result,
		isFetching,
		errorText,
		hasFilter,
		isSuccess,
		isRunning,
	};
}
