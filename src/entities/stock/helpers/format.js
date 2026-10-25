export const formatPrice = (v) =>
	new Intl.NumberFormat("ru-RU", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(v);

export const formatDate = (iso) => {
	try {
		return new Intl.DateTimeFormat("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(iso));
	} catch {
		return iso;
	}
};
