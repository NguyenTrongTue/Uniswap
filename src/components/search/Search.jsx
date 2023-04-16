import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { SearchIcon } from "../Icon";
const cx = classNames.bind(styles);


const Search = () => {
  return (
    <label htmlFor="search" className={cx("search")}>
      <SearchIcon className={cx("icon")} width="16" height="16" />

      <input type="text" id="search" placeholder="Search tokens or pools" />
    </label>
  );
};

export default Search;
