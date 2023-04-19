import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Profile = () => {
  return <div className={cx("profle")}>Nguyen Trong Tue</div>;
};

export default Profile;
