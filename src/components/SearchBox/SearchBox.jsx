import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.box}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        className={css.input}
        id="filter"
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBox;
