import css from "./ErrorMessage.module.css";
import { FC } from "react";
interface ErrorMessageProps {
  error: boolean;
}
const ErrorMessage: FC <ErrorMessageProps> = ({ error }) => {
  return (
    <div className={css.error}>
<p className={css.texterror}>
  {error || "Whoops, there was an error, please reload the page!"}
</p>
    </div>
  );
}
export default ErrorMessage;
