import ClipLoader from "react-spinners/ClipLoader";
import css from "./Loader.module.css";
export default function Loader({ loading, color = "#00FF88", size = 50 }) {
  return (
    <div className={css.loader}>
      <ClipLoader
        className={css.loading}
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
