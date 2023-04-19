import classNames from "classnames/bind";

import Header from "../components/header/Header";
import Sidebar from "~/components/sidebar/Sidebar";

import styles from "./SidebarLayout.module.scss";

const cx = classNames.bind(styles);

export default function SidebarLayout({ children }) {
  return (
    <div className={cx("sidebar-wrapper")}>
      <Header />
      <div className={cx("sidebar-container")}>
        <Sidebar />
        <div className={cx("sidebar-content")}>{children}</div>
      </div>
    </div>
  );
}
