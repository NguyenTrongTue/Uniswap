import React, { useEffect, useState } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "~/store/firebase";

import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarUtils from "~/utils/avatar";
import { GoogleIcon } from "~/components/Icon";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { loginSuccess } from "~/redux/userSlice";
import ModalComponent from "./Modal";
const cx = classNames.bind(styles);

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [link, setLink] = useState(currentUser.loginMethod);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;

        dispatch(
          loginSuccess({
            username: displayName,
            email,
            gender: "",
            birthday: "",
            phone: "",
            bio: "",
            loginMethod: "google",
          })
        );
        setLink("google");
      })
      .catch((error) => {});
  };

  const handleLoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;

        dispatch(
          loginSuccess({
            username: displayName,
            email,
            gender: "",
            birthday: "",
            phone: "",
            bio: "",
            loginMethod: "facebook",
          })
        );
        setLink("facebook");
      })
      .catch((error) => {});
  };

  return (
    <div className={cx("profle")}>
      <div className={cx("top")}>
        <div className={cx("user")}>
          <div className={cx("avatar")}>
            <Avatar
              style={{ width: 80, height: 80, fontSize: 40, cursor: "pointer" }}
              {...AvatarUtils.stringAvatar(currentUser.username)}
            />
          </div>
          <div className={cx("username")}>{currentUser.username}</div>
        </div>
        <div className={cx("editWrap")} onClick={() => setOpen(true)}>
          <EditIcon className={cx("editIcon")} />
          <span className={cx("editLabel")}>Edit information</span>
        </div>
      </div>
      <div className={cx("body")}>
        <div className={cx("item")}>
          <div className={cx("itemLabel")}>Gender</div>
          <div className={cx("itemValue")}>
            {currentUser.gender ? (
              currentUser.gender
            ) : (
              <span className={cx("notupdate")}>Not update</span>
            )}
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("itemLabel")}>Birthday</div>
          <div className={cx("itemValue")}>
            {currentUser.birthday ? (
              currentUser.birthday
            ) : (
              <span className={cx("notupdate")}>Not update</span>
            )}
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("itemLabel")}>Email</div>
          <div className={cx("itemValue")}>
            {currentUser.email ? (
              currentUser.email
            ) : (
              <span className={cx("notupdate")}>Not update</span>
            )}
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("itemLabel")}>Phone Number</div>
          <div className={cx("itemValue")}>
            {currentUser.phone ? (
              currentUser.phone
            ) : (
              <span className={cx("notupdate")}>Not update</span>
            )}
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("itemLabel")}>Bio</div>
          <div className={cx("itemValue")}>
            {currentUser.bio ? (
              currentUser.bio
            ) : (
              <span className={cx("notupdate")}>Not update</span>
            )}
          </div>
        </div>

        <div className={cx("linkAccount")}>
          <div className={cx("itemLabel")}>Account link</div>
          <div className={cx("link")}>
            <div className={cx("linkItem")}>
              <div className={cx("linkItemLeft")}>
                <FacebookOutlinedIcon
                  style={{
                    fontSize: "38px",
                    color: "#2F80ED",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "white",
                  }}
                />

                <div className={cx("linkLabel")}>Facebook</div>
              </div>
              <div
                className={cx("linkItemRight")}
                onClick={handleLoginWithFacebook}
              >
                {link === "facebook" ? "Linked" : "Link"}
              </div>
            </div>
            <div className={cx("linkItem")}>
              <div className={cx("linkItemLeft")}>
                <GoogleIcon
                  width="30px"
                  height="30px"
                  className={cx("linkIcon")}
                />
                <div className={cx("linkLabel")}>Google</div>
              </div>
              <div
                className={cx("linkItemRight")}
                onClick={handleLoginWithGoogle}
              >
                {link === "google" ? "Linked" : "Link"}
              </div>
            </div>
          </div>
        </div>
        {currentUser.loginMethod === "username" && (
          <div className={cx("item", "passwrap")}>
            <div className={cx("passIcon")}>
              <LockIcon />
            </div>
            <div className={cx("passLabel")}>Change password</div>
          </div>
        )}
      </div>
      <ModalComponent open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
