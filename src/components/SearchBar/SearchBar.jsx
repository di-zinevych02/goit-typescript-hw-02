import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    //Користувач не зможе відправити рядок, який містить лише пробіли.
    const trimmedTerm = values.searchInput.trim();

    actions.resetForm();
    if (trimmedTerm === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSearch(trimmedTerm); // Передаємо значення в проп onSearch
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={{ searchInput: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchform}>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
            className={css.input}
          />
          <button type="submit" className={css.btnsearch}>
            <FaSearch />
          </button>
        </Form>
      </Formik>
    </header>
  );
};
export default SearchBar;
