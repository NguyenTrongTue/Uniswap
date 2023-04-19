import classNames from "classnames/bind";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

import styles from "./Default.module.scss";

const cx = classNames.bind(styles);

export default function Default({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
    </div>
  );
}
