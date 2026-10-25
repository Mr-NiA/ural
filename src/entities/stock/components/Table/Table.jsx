import { formatDate, formatPrice } from "../../helpers/format";
import styles from "./Table.module.css";

export const Table = ({ data }) => {
	if (data.length > 0)
		return (
			<div className={styles.results}>
				{data.map((good) => (
					<article key={good.goodsID} className={styles.card}>
						<header className={styles.cardHeader}>
							<div>
								<span className={styles.brand}>{good.brand}</span>
								<span className={styles.number}>{good.number}</span>
							</div>
							<h2 className={styles.name}>{good.name}</h2>
							<div className={styles.meta}>
								<span>Всего на складах: {good.count} шт.</span>
								<span>Кратность: {good.rate}</span>
								{good.notRefund && (
									<span className={`${styles.badge} ${styles.badgeWarn}`}>
										Невозвратная позиция
									</span>
								)}
							</div>
						</header>

						<ul className={styles.warehouseList}>
							{good.warehouses.map((wh) => (
								<li key={wh.id} className={styles.warehouseItem}>
									<div>
										<div className={styles.whName}>
											{wh.code ?? wh.id}
											{wh.own && (
												<span
													className={`${styles.badge} ${styles.badgeOk}`}
													style={{ marginLeft: 8 }}
												>
													наш склад
												</span>
											)}
										</div>
										<div className={styles.whMeta}>
											отгрузка с {formatDate(wh.shipmentDate)}
										</div>
									</div>
									<div className={styles.whStock}>{wh.stock} шт.</div>
									<div className={styles.whPrice}>
										{formatPrice(wh.price)} ₽
									</div>
								</li>
							))}
						</ul>

						{good.analogues && good.analogues.length > 0 && (
							<details className={styles.analogues}>
								<summary className={styles.analoguesSummary}>
									Аналоги ({good.analogues.length})
								</summary>
								<ul className={styles.analoguesList}>
									{good.analogues.map((a) => (
										<li key={a.goodsID} className={styles.analogueItem}>
											<span>
												<strong>{a.brand}</strong> {a.number}
												{a.name ? ` — ${a.name}` : ""}
											</span>
											<span>{a.count} шт.</span>
										</li>
									))}
								</ul>
							</details>
						)}
					</article>
				))}
			</div>
		);
	return (
		<div className={styles.empty}>По вашему запросу ничего не найдено</div>
	);
};
