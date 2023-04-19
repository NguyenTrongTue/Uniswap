import { useSelector } from "react-redux";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <div className={cx("avatar")}></div>
        <div className={cx("username")}>{currentUser.username}</div>
      </div>
      <div className={cx("center")}>
        <div className={cx("item")}>
          <div className={cx("itemIcon")}></div>
          <div className={cx("itemLabel")}></div>
        </div>
        <div className={cx("item")}>
          <div className={cx("itemIcon")}></div>
          <div className={cx("itemLabel")}></div>
        </div>
      </div>
      <div className={cx("bot")}>
        <div className={cx("button")}>
          <div className={cx("logoutIcon")}></div>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
