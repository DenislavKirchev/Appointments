"use client";
import React from "react";
import { useFormik } from "formik";
import { updatePatient } from "./actions";
import { CustomTextInput } from "@/ui/CustomTextInput";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import styles from "./patientData.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IPatientForm {
  cities: ICity[];
  patientData: {
    user: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      city_id: number;
    };
    gender: string;
    egn: string;
    age: string;
  };
}

interface ICity {
  id: number;
  name: string | null;
}

export interface IPatientFormik {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  phoneNumber: string;
  gender: string;
  egn: string;
  age: string;
}

const PatientData = ({ cities, patientData }: IPatientForm) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik<IPatientFormik>({
    initialValues: {
      email: patientData.user.email,
      password: patientData.user.password,
      firstName: patientData.user.first_name,
      lastName: patientData.user.last_name,
      cityId: patientData.user.city_id ? patientData.user.city_id : 0,
      phoneNumber: patientData.user.phone_number,
      gender: patientData.gender,
      egn: patientData.egn,
      age: patientData.age,
    },
    onSubmit: async (data: IPatientFormik) => {
      await updatePatient(data);
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>Update my information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            label="Email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography className={styles.modalLabel}>Password</Typography>
          <TextField
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="password"
            type={showPassword ? "text" : "password"}
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
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            label="First Name"
            value={formik.values.firstName}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="firstName"
            type="firstName"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            label="Last Name"
            value={formik.values.lastName}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="lastName"
            type="lastName"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            label="Phone number"
            value={formik.values.phoneNumber}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="phoneNumber"
            type="phoneNumber"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            label="egn"
            value={formik.values.egn}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="egn"
            type="egn"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>City</Typography>
          <FormControl fullWidth>
            <Select
              labelId="city-label"
              id="cityId"
              name="cityId"
              value={formik.values.cityId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" disabled>
                Select a city
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            label="Age"
            value={formik.values.age}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="age"
            type="age"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            label="Gender"
            value={formik.values.gender}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="gender"
            type="gender"
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default PatientData;
