import css from "./LoadMoreBtn.module.css";
import { FC } from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
  children: React.ReactNode;
}
const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.loadmorecontainer}>
      <button className={css.btnloadmore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;