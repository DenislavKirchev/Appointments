"use client";
import React from "react";
import { useFormik } from "formik";
import { updateDoctor } from "./actions";
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
  Card,
} from "@mui/material";
import styles from "./doctorData.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface User {
  id: number;
  email: string;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  phone_number: string | null;
  city_id: number | null;
}

interface Speciality {
  id: number;
  name: string | null;
}

interface DoctorData {
  id: number;
  user_id: number;
  speciality_id: number;
  hospital_id: number;
  user: User;
  speciality: Speciality;
}

interface IHospital {
  id: number;
  name: string | null;
}

interface ICity {
  id: number;
  name: string | null;
}

interface DoctorDataProps {
  doctorData: DoctorData;
  cities: ICity[];
  hospitals: IHospital[];
}

export interface IDoctorFormik {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  hospitalId: number;
  phoneNumber: string;
}

const DoctorData = ({ cities, hospitals, doctorData }: DoctorDataProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik<IDoctorFormik>({
    initialValues: {
      email: doctorData.user.email,
      password: doctorData.user.password!,
      firstName: doctorData.user.first_name!,
      lastName: doctorData.user.last_name!,
      cityId: doctorData.user.city_id ? doctorData.user.city_id : 0,
      phoneNumber: doctorData.user.phone_number!,
      hospitalId: doctorData.hospital_id ? doctorData.hospital_id : 0,
    },
    onSubmit: async (data: IDoctorFormik) => {
      await updateDoctor(data);
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
      <Typography className={styles.pageTitle}>Update my information</Typography>
      <Card className={styles.appointmentCard}>
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
            label="Speciality"
            value={doctorData.speciality.name!}
            onChange={() => {
            }}
            disabled={true}
            name="speciality"
            type="speciality"
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
        <Typography>Hospital</Typography>
          <FormControl fullWidth>
            <Select
              labelId="hospital-label"
              id="hospitalId"
              name="hospitalId"
              value={formik.values.hospitalId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" disabled>
                Select a hospital
              </MenuItem>
              {hospitals.map((hospital) => (
                <MenuItem key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" className={styles.continueButton}>
        Submit
      </Button>
      </Card>
    </form>
  );
};

export default DoctorData;
