"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createSpeciality, ISpecialitiesFormik } from "./actions";
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
import styles from "./createSpeciality.module.css";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

interface ISpecialitiesForm {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSpecialityForm = ({
  isOpen,
  onClose,
}: ISpecialitiesForm) => {
  const formik = useFormik<ISpecialitiesFormik>({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      if (formik.isValid) {
        await createSpeciality(formik.values);
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
      <Typography>Create speciality</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
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
      </Grid>      

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Grid>
    </Modal>
  );
};

export default CreateSpecialityForm;
