import React, { useState } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const cx = classNames.bind(styles);

function FirstComponent({ birthday, setBirthday }) {
  const initialDate = birthday || null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Birth day"
          value={initialDate}
          onChange={(newValue) => setBirthday(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

const Register = () => {
  const navigation = useNavigate();
  const [gender, setGender] = React.useState("");
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Fullname is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
      birthday: "",
      phone: "",
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        gender: gender,
        birthday: birthday.$y + "-" + (birthday.$M + 1) + "-" + birthday.$D,
        phone: "",
        bio: "",
      };
      const dataJSON = JSON.stringify(newUser);

      console.log(dataJSON);
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetch("http://localhost:8000/usercreate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJSON,
        });

        setLoading(false);
        document.querySelector(".alert").classList.remove("hide");
        document.querySelector(".alert").classList.add("active");
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("active");
          document.querySelector(".alert").classList.add("hide");
          navigation("/login");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
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
            <Link to={"/login"} className={cx("singup")}>
              Log in now
            </Link>
          </div>
        </div>
        <div className={cx("center")}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>

              <Select
                labelId="gender-label"
                id="Gender"
                className={cx("select")}
                label="Gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
              <TextField
                autoComplete="off"
                fullWidth
                className={cx("input")}
                id="username"
                name="username"
                label="Full Name"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                autoComplete="off"
                fullWidth
                className={cx("input")}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FirstComponent birthday={birthday} setBirthday={setBirthday} />

              <TextField
                autoComplete="off"
                fullWidth
                className={cx("input")}
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <Alert severity="success" className="alert hide">
        Account successfully created
      </Alert>
    </div>
  );
};

export default Register;
