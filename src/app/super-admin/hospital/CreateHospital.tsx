"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {createHospital} from "./actions";
import { CustomTextInput } from "@/ui/CustomTextInput";
import styles from "./createHospital.module.css";
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

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  cityId: yup.number().required('City is required').notOneOf([0], 'Please select a city'),
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

export interface IHospitalFormik {
  name: string;
  address: string;
  cityId: number;
}

interface IMedicalSpecialistForm {
  cities: ICity[];
  isOpen: boolean;
  onClose: () => void;
}

const HospitalForm = ({
  isOpen,
  onClose,
  cities,
}: IMedicalSpecialistForm) => {
  const formik = useFormik<IHospitalFormik>({
    initialValues: {
      name: "",
      address: "",
      cityId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      if (formik.isValid) {
        await createHospital(formik.values);
        formik.resetForm();
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={styles.modal}>
      <Grid className={styles.modalContainer}>
      <Typography>Create hospital</Typography>
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} >
        <Grid item xs={3} width={"100%"} height={"100%"}>
          <CustomTextInput
            label="Name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            name="name"
            type="name"
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextInput
            label="Address"
            value={formik.values.address}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            name="address"
            type="address"
          />
        </Grid>
        <Grid item xs={3}>
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
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Grid>
    </Modal>
  );
};

export default HospitalForm;
