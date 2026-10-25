/**
 * Приводит ответ сервиса к удобному виду.
 * @param {{ goods?: any[], error?: string }} res
 * @returns {{ ok: true, goods: any[] } | { ok: false, error: string }}
 */



const extraExcludeGoodsID = ["00000000-0000-0000-0000-000000000000"];
export function normalizePriceResponse(res) {
	const goods = res?.goods ?? [];
	const isEmpty =
		(goods.length === 1 && !goods[0].goodsID) ||
		(extraExcludeGoodsID.includes(goods[0].goodsID) && !goods[0].number);

	return { ok: true, goods: isEmpty ? [] : goods };
}
