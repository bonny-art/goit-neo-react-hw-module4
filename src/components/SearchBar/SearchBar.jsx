import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;

    const query = form.elements.query.value.trim().toLowerCase();
    console.log("🚀 ~ query:", query);

    if (!query) {
      toast.error("Please enter something to search for images.");
      return;
    }

    onSubmit(query);

    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={styles.fieldWrapper}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />

        <button type="submit" className={styles.button}>
          <FiSearch size={24} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
