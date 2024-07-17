"use client";
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import styles from "./signin-page.module.css";
import React from "react";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signinAction } from "@/lib/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  email: yup.string().required("Полето е задължително"),
  password: yup.string().required("Полето е задължително")
});

const SigninForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: async (data: any) => {
      await signinAction(data);
    },
    validateOnMount: true,
    enableReinitialize: true
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className={styles.container}>
        <Grid item xs={10}>
          <Grid className={styles.innerContainer}>
            <Typography className={styles.title}>Onco360</Typography>
            <Typography className={styles.subTitle}>
              Въведете своите данни, за да влезете в платформата за биомаркерно тестване в онкология
            </Typography>
            <Grid className={styles.divider} />
            <Typography className={styles.modalLabel}>Email</Typography>
            <TextField
              id={"email"}
              className={styles.input}
              name="email"
              type={"text"}
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <Typography className={styles.modalLabel}>Парола</Typography>
            <TextField
              id={"password"}
              className={styles.input}
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onBlur={formik.handleBlur}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Grid className={styles.divider} />
            <Stack spacing={3} className={styles.buttonContainer}>
              <Button className={styles.button} variant="contained" type="submit">
                Вход
              </Button>
              {/* <Typography
                className={styles.forgotPassword}
                onClick={() => {
                  router.push("/reset-password");
                }}
              >
                Забравена парола
              </Typography> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;