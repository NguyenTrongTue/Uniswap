import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FacebookIcon, GoogleIcon } from "~/components/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

import requests from "~/api/httpRequests";
import loginMethods from "~/utils/Login";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    username: yup.string("Enter your username").required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await requests.login(values.username);
        dispatch(loginSuccess({ ...res, loginMethod: "username" }));

        setLoading(false);

        navigate("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleLoginWithGoogle = async () => {
    const data = await loginMethods.loginWithGoogle();
    dispatch(loginSuccess(data));
    navigate("/");
  };

  const handleLoginWithFacebook = async () => {
    const data = await loginMethods.loginWithFacebook();
    dispatch(loginSuccess(data));
    navigate("/");
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
              Or with username and password
            </div>
            <div className={cx("seperate")}></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoComplete="off"
              fullWidth
              className={cx("input")}
              id="username"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              autoComplete="off"
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
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
