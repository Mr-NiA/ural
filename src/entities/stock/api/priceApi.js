import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://api.favorit-parts.ru/hs/hsprice/";

/**
 * @typedef {Object} Warehouse
 * @property {string} [code]
 * @property {string} id
 * @property {boolean} own
 * @property {string} shipmentDate
 * @property {number} price
 * @property {number} stock
 * @property {boolean} [notRefund]
 * @property {string} [warehouseShipping]
 */

/**
 * @typedef {Object} Good
 * @property {string} goodsID
 * @property {string} brand
 * @property {string} number
 * @property {string} name
 * @property {number} count
 * @property {number} price //@deprecated
 * @property {number} rate
 * @property {Good[]} [analogues]
 * @property {Warehouse[]} warehouses
 * @property {boolean} [notRefund]
 */

/**
 * @typedef {Object} PriceResponse
 * @property {Good[]} [goods]
 * @property {string} [error]
 */

/**
 * @typedef {Object} PriceQueryParams
 * @property {string} key
 * @property {string} number
 * @property {string} [brand]
 * @property {'on'} [analogues]
 * @property {'on'} [info]
 */

// Замена спецсимволов в параметрах запроса, чтобы избежать проблем с кодировкой
const encodeParam = (value) =>
	encodeURIComponent(value).replace(/%23/gi, "%23").replace(/%26/gi, "%26");

const CLIENT_KEY = "00000000-0000-0000-0000-000000000001";

export const priceApi = createApi({
	reducerPath: "priceApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ["Price"],
	endpoints: (builder) => ({
		/** @param {PriceQueryParams} args */
		getPrice: builder.query({
			query: ({ number, brand, analogues, info }) => {
				const params = new URLSearchParams();
				params.set("key", CLIENT_KEY);
				params.set("number", encodeParam(number));
				if (brand) params.set("brand", encodeParam(brand));
				if (analogues) params.set("analogues", analogues);
				if (info) params.set("info", info);

				return { url: "", method: "GET", params };
			},
			providesTags: (_result, _error, arg) => [
				{ type: "Price", id: `${arg.number}_${arg.brand ?? "all"}` },
			],
		}),
	}),
});

export const { useGetPriceQuery, useLazyGetPriceQuery } = priceApi;
