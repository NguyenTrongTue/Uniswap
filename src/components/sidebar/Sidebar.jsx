import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import Avatar from "@mui/material/Avatar";

import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import AvatarUtils from "~/utils/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "~/redux/userSlice";

const cx = classNames.bind(styles);

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <div className={cx("avatar")}>
          <Avatar
            style={{ cursor: "pointer" }}
            {...AvatarUtils.stringAvatar("Nguyễn Trọng Tuế")}
          />
        </div>
        <div className={cx("username")}>{currentUser.username}</div>
      </div>
      <div className={cx("center")}>
        <NavLink
          to={"/portfolio"}
          className={(nav) => {
            return nav.isActive ? cx("item", "active") : cx("item");
          }}
        >
          <div className={cx("itemIcon")}>
            <AccountBalanceWalletIcon />
          </div>
          <div className={cx("itemLabel")}>My wallet</div>
        </NavLink>
        <NavLink
          to={"/profile"}
          className={(nav) => {
            return nav.isActive ? cx("item", "active") : cx("item");
          }}
        >
          <div className={cx("itemIcon")}>
            <AccountCircleIcon />
          </div>
          <div className={cx("itemLabel")}>Account information</div>
        </NavLink>
      </div>
      <div className={cx("bot")}>
        <div className={cx("button")} onClick={handleLogout}>
          <div className={cx("logoutIcon")}>
            <LogoutIcon />
          </div>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
