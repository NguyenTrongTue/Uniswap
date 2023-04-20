import { useState } from "react";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";

import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";

import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "~/redux/userSlice";

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

function ModalComponent({ open, setOpen }) {
  const { currentUser } = useSelector((state) => state.user);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState(currentUser.gender);
  const [birthday, setBirthday] = useState("");

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    bio: yup.string("Enter your email"),
    phone: yup.string("Enter your email"),
  });

  const formik = useFormik({
    initialValues: {
      birthday: "",
      phone: currentUser.phone,
      bio: currentUser.bio,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        username: currentUser.username,
        email: currentUser.email,
        gender: gender,
        birthday: birthday.$y + "-" + (birthday.$M + 1) + "-" + birthday.$D,
        phone: values.phone,
        bio: values.bio,
        password: "123456",
      };
      const dataJSON = JSON.stringify(newUser);
      const { username, email, password, ...payload } = newUser;
      dispatch(updateUser(payload));

      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetch("http://localhost:8000/update_user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJSON,
        });
        setOpen(false);
        setLoading(false);
        document.querySelector(".alert").classList.remove("hide");
        document.querySelector(".alert").classList.add("active");
        setTimeout(() => {
          document.querySelector(".alert").classList.remove("active");
          document.querySelector(".alert").classList.add("hide");
          navigation("/profile");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={cx("modal")}>
          <div className={cx("modalTop")}>
            <div className={cx("mtLabel")}>Edit information</div>
            <div style={{ cursor: "pointer" }} onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          <div className={cx("modalBody")}>
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

                <FirstComponent birthday={birthday} setBirthday={setBirthday} />
                <TextField
                  autoComplete="off"
                  fullWidth
                  className={cx("input")}
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  className={cx("input")}
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
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
                    "Update"
                  )}
                </Button>
              </FormControl>
            </form>
          </div>
        </div>
      </Modal>
      <Alert severity="success" className="alert hide">
        The account has been updated successfully
      </Alert>
    </div>
  );
}

export default ModalComponent;
