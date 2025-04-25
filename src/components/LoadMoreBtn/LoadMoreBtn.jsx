import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.loadmorecontainer}>
      <button className={css.btnloadmore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
