import styles from "./Loader.module.css";

export const Loader = ({ size = 20, isLoading }) =>
	isLoading ? (
		<span
			className={styles.spinner}
			style={{ width: size, height: size }}
			aria-label="Загрузка"
			role="status"
		/>
	) : null;
