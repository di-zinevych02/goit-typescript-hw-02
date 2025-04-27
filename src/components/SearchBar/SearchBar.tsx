import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { Formik, Form, Field, FormikHelpers  } from "formik";
import { FaSearch } from "react-icons/fa";
import { FC } from "react";
interface SearchFormValues {
  searchInput: string;
}
//функція приймає string
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>) => {
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
