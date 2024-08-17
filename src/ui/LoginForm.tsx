"use client";
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "./signin-page.module.css";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createPatient } from "@/app/login/actions";

const validationSchema = yup.object({
  email: yup.string().required("required"),
  password: yup.string().required("required")
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (data: any) => {
      await createPatient(data);
    }
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
            <Typography className={styles.title}>My Doctor</Typography>
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
            <Typography className={styles.modalLabel}>Password</Typography>
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Grid className={styles.divider} />
            <Stack spacing={3} className={styles.buttonContainer}>
              <Button className={styles.button} variant="contained" type="submit">
                Submit
              </Button>
              <Typography
                className={styles.forgotPassword}
                onClick={() => {
                  router.push("/auth/signin");
                }}
              >
                I have a registration
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;