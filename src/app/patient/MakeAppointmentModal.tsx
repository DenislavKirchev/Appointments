"use client";
import Button from "@mui/material/Button";
import { Grid, Modal, Typography } from "@mui/material";
import styles from "./makeAppointment.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomTextInput } from "@/ui/CustomTextInput";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface CreateMedicalSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const namePattern = /^(?!-)[A-Za-zА-Яа-я]+(?:[ -][A-Za-zА-Яа-я]+)*(?<!-)$/;

const validationSchema = yup.object({
  first_name: yup
    .string()
    .matches(namePattern, "Please enter only letters")
    .required("Required"),
  last_name: yup
    .string()
    .matches(namePattern, "Please enter only letters")
    .required("Required"),
  appointment_date: yup.date().required("Please choose a date and time"),
});

const MakeAppoinmentModal = ({
  isOpen,
  onClose,
}: CreateMedicalSpecialistModalProps) => {
  const formikMedicalSpecialistDetails = useFormik<any>({
    initialValues: {
      first_name: "",
      last_name: "",
      appointment_date: "",
    },
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  const handleSubmit = async () => {
    try {
      if (formikMedicalSpecialistDetails.isValid) {
        // await createMedicalSpecialist(formikMedicalSpecialistDetails.values);
        onClose();
        formikMedicalSpecialistDetails.resetForm();
      }
    } catch (error) {
      console.error("Error submitting medical specialist data:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={styles.modal}>
      <Grid className={styles.modalContainer}>
        <Typography className={styles.modalTitle}>Make appointment</Typography>
        <form onSubmit={formikMedicalSpecialistDetails.handleSubmit}>
          <Grid container justifyContent={"space-between"}>
            <Grid item width={"48%"}>
              <CustomTextInput
                label="First name *"
                labelStyle={styles.modalLabel}
                fieldStyle={styles.modalTextField}
                value={formikMedicalSpecialistDetails.values.first_name}
                onChange={(e: any) => {
                  formikMedicalSpecialistDetails.handleChange(e);
                }}
                error={
                  formikMedicalSpecialistDetails.validateOnChange &&
                  formikMedicalSpecialistDetails.touched.first_name &&
                  Boolean(formikMedicalSpecialistDetails.errors.first_name)
                }
                // helperText={
                //   formikMedicalSpecialistDetails.validateOnChange &&
                //   formikMedicalSpecialistDetails.touched.first_name &&
                //   formikMedicalSpecialistDetails.errors.first_name
                // }
                name={"first_name"}
                placeholder={"Enter your first name "}
                type={"text"}
              />
            </Grid>
            <Grid item width={"48%"}>
              <CustomTextInput
                label="Last name *"
                labelStyle={styles.modalLabel}
                fieldStyle={styles.modalTextField}
                value={formikMedicalSpecialistDetails.values.last_name}
                onChange={(e: any) => {
                  formikMedicalSpecialistDetails.handleChange(e);
                }}
                error={
                  formikMedicalSpecialistDetails.validateOnChange &&
                  formikMedicalSpecialistDetails.touched.last_name &&
                  Boolean(formikMedicalSpecialistDetails.errors.last_name)
                }
                // helperText={
                //   formikMedicalSpecialistDetails.validateOnChange &&
                //   formikMedicalSpecialistDetails.touched.last_name &&
                //   formikMedicalSpecialistDetails.errors.last_name
                // }
                name={"last_name"}
                placeholder={"Enter your last name"}
                type={"text"}
              />
            </Grid>
            <Grid item width={"100%"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Choose date and hour">
                  {/* <MobileDateTimePicker
                    value={
                      dayjs(formikMedicalSpecialistDetails.values.appointment_date)
                    }
                    onChange={(date) =>
                      formikMedicalSpecialistDetails.setFieldValue(
                        "appointment_date",
                        date
                      )
                    }
                  /> */}
                  <MobileDateTimePicker defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid className={styles.modalButtonSection}>
            <Button className={styles.closeButton} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className={styles.continieButton}>
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Modal>
  );
};

export default MakeAppoinmentModal;
