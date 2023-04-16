import React, { useRef } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "~/store/firebase";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FacebookIcon, GoogleIcon } from "~/components/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/userSlice";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginSuccess(values));
      navigate("/");
    },
  });

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { displayName, email } = result.user;

        dispatch(loginSuccess({ fullname: displayName, email }));
        navigate("/");
      })
      .catch((error) => {});
  };

  const handleLoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;

        dispatch(loginSuccess({ fullname: displayName, email }));
      })
      .catch((error) => {});
  };

  return (
    <div
      className={cx("container")}
      style={{
        backgroundImage: `url(${require("~/assets/background.png")})`,
      }}
    >
      <div className={cx("wrapper")}>
        <div className={cx("top")}>
          <div className={cx("brand")}>
            <img
              src={require("~/assets/logo.png")}
              className={cx("logo")}
              alt=""
            />
            <div className={cx("brandName")}>Uniswap</div>
          </div>
          <div className={cx("title")}>Log in to your account</div>
          <div className={cx("noAccount")}>
            Don't have an account?{" "}
            <Link to={"/register"} className={cx("singup")}>
              Sign Up
            </Link>
          </div>
        </div>
        <div className={cx("center")}>
          <div className={cx("other")}>
            <div className={cx("item")} onClick={handleLoginWithGoogle}>
              <GoogleIcon />
              <div className={cx("itemTitle")}>Google</div>
            </div>
            <div className={cx("item")} onClick={handleLoginWithFacebook}>
              <FacebookIcon />
              <div className={cx("itemTitle")}>Facebook</div>
            </div>
          </div>
          <div className={cx("seperateWrapper")}>
            <div className={cx("seperate")}></div>
            <div className={cx("separateAccount")}>
              Or with email and password
            </div>
            <div className={cx("seperate")}></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoComplete={false}
              fullWidth
              className={cx("input")}
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              autoComplete={false}
              fullWidth
              className={cx("input")}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
