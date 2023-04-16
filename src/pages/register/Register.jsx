import React, { useRef } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FacebookIcon, GoogleIcon } from "~/components/Icon";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Register = () => {
  const validationSchema = yup.object({
    fullname: yup
      .string("Enter your fullname")
      .required("Fullname is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
          <div className={cx("title")}>Create your account</div>
          <div className={cx("noAccount")}>
            Have an account?{" "}
            <Link to={"/login"} pan className={cx("singup")}>
              Log in now
            </Link>
          </div>
        </div>
        <div className={cx("center")}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoComplete={false}
              fullWidth
              className={cx("input")}
              id="fullname"
              name="fullname"
              placeholder="Full name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
            />
            <TextField
              autoCo={false}
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
              autoCo={false}
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
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
