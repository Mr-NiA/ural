import { Table } from "../entities/stock/components/Table/Table";
import { usePriceSearch } from "../entities/stock/hook/usePriceSearch";
import { Loader } from "../shared/ui/Loader/Loader";
import styles from "./App.module.css";

const TEXT = {
	title: "Поиск автозапчастей",
	subtitle:
		"Введите номер детали. Производитель и поиск аналогов — опционально.",
};

const FORM_LABELS = {
	number: "Номер детали",
	brand: "Производитель",
	withAnalogues: "Показывать аналоги(требуется производитель)",
};

export function App() {
	const {
		state,
		result,
		isFetching,
		errorText,
		handleChangeFilter,
		hasFilter,
		isSuccess,
		isRunning,
	} = usePriceSearch();

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{TEXT.title}</h1>
			<p className={styles.subtitle}>{TEXT.subtitle}</p>

			<div className={styles.form}>
				<div className={styles.formInputSection}>
					<label className={styles.field}>
						<span className={styles.label}>{FORM_LABELS.number}</span>
						<input
							className={styles.input}
							placeholder="например, 7160500039S"
							value={state.number}
							name="number"
							onChange={handleChangeFilter("number")}
						/>
					</label>

					<label className={styles.field}>
						<span className={styles.label}>{FORM_LABELS.brand}</span>
						<input
							className={styles.input}
							placeholder="например, MEYLE"
							value={state.brand}
							name="brand"
							onChange={handleChangeFilter("brand")}
						/>
					</label>
					<Loader isLoading={isFetching && hasFilter} />
				</div>

				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						name="withAnalogues"
						checked={state.withAnalogues}
						disabled={!state.brand.trim()}
						onChange={handleChangeFilter("withAnalogues")}
					/>
					<span>{FORM_LABELS.withAnalogues}</span>
				</label>
			</div>

			{!isFetching && hasFilter && !isRunning && (
				<div className={styles.resultsContainer}>
					{errorText && <div className={styles.error}>{errorText}</div>}
					{isSuccess && <Table data={result?.goods || []} />}
				</div>
			)}
		</div>
	);
}
