"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createDoctor, IMedicalSpecialistsFormik } from "./actions";
import { CustomTextInput } from "@/ui/CustomTextInput";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Modal
} from "@mui/material";
import styles from "./createDoctor.module.css";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  cityId: yup
    .number()
    .required("City is required")
    .notOneOf([0], "Please select a city"),
  hospitalId: yup.number().required('Hospital is required').notOneOf([0], 'Please select a hospital'),
  specialityId: yup.number().required('Speciality is required').notOneOf([0], 'Please select a speciality'),
});

interface ICity {
  id: number;
  name: string | null;
}

interface IHospital {
  id: number;
  name: string | null;
  address: string | null;
  city_id: number;
}

interface ISpeciality {
  id: number;
  name: string | null;
}

interface IMedicalSpecialistForm {
  isOpen: boolean;
  onClose: () => void;
  cities: ICity[];
  hospitals: IHospital[];
  specialities: ISpeciality[];
}

const MedicalSpecialistForm = ({
  isOpen,
  onClose,
  cities,
  hospitals,
  specialities,
}: IMedicalSpecialistForm) => {
  const formik = useFormik<IMedicalSpecialistsFormik>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      cityId: 0,
      phoneNumber: "",
      role: "doctor",
      hospitalId: 0,
      specialityId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      if (formik.isValid) {
        await createDoctor(formik.values);
        formik.resetForm();
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={styles.modal}>
      <Grid className={styles.modalContainer}>
    <form onSubmit={formik.handleSubmit}>
      <Typography>Create doctor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            label="Email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            name="email"
            type="email"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            label="Password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            name="password"
            type="password"
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
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
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
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
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
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            name="phoneNumber"
            type="phoneNumber"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Speciality</Typography>
          <FormControl
            fullWidth
            error={
              formik.touched.specialityId && Boolean(formik.errors.specialityId)
            }
          >
            <Select
              labelId="speciality-label"
              id="specialityId"
              name="specialityId"
              value={formik.values.specialityId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" disabled>
                Select a speciality
              </MenuItem>
              {specialities.map((speciality) => (
                <MenuItem key={speciality.id} value={speciality.id}>
                  {speciality.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.specialityId && formik.errors.specialityId ? (
              <FormHelperText>{formik.errors.specialityId}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>City</Typography>
          <FormControl
            fullWidth
            error={formik.touched.cityId && Boolean(formik.errors.cityId)}
          >
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
            {formik.touched.cityId && formik.errors.cityId ? (
              <FormHelperText>{formik.errors.cityId}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography>Hospital</Typography>
          <FormControl
            fullWidth
            error={
              formik.touched.hospitalId && Boolean(formik.errors.hospitalId)
            }
          >
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
            {formik.touched.hospitalId && formik.errors.hospitalId ? (
              <FormHelperText>{formik.errors.hospitalId}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Grid>
    </Modal>
  );
};

export default MedicalSpecialistForm;
