"use client";
import Button from "@mui/material/Button";
import { Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import styles from "./makeAppointment.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomTextInput } from "@/ui/CustomTextInput";
import { createAppointment } from "./actions";

interface CreateMedicalSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: number;
}

const validationSchema = yup.object({
  appointment_date: yup.date().required("Please choose a date and time"),
});

enum AppointmentHours {
  "09:00" = "09:00",
  "09:30" = "09:30",
  "10:00" = "10:00",
  "10:30" = "10:30",
  "11:00" = "11:00",
  "11:30" = "11:30",
  "12:00" = "12:00",
  "12:30" = "12:30",
  "13:00" = "13:00",
  "13:30" = "13:30",
  "14:00" = "14:00",
  "14:30" = "14:30",
  "15:00" = "15:00",
  "15:30" = "15:30",
  "16:00" = "16:00",
  "16:30" = "16:30",
  "17:00" = "17:00",
  "17:30" = "17:30",
  "18:00" = "18:00",
}

const MakeAppointmentModal = ({
  isOpen,
  onClose,
  doctorId
}: CreateMedicalSpecialistModalProps) => {
  const today = new Date().toISOString().split('T')[0]; 

  const formikMedicalSpecialistDetails = useFormik<any>({
    initialValues: {
      patientId: 1,
      appointment_date: "", 
      appointment_time: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      if (formikMedicalSpecialistDetails.isValid) {
        await createAppointment(doctorId, formikMedicalSpecialistDetails.values.patientId, formikMedicalSpecialistDetails.values.appointment_date, formikMedicalSpecialistDetails.values.appointment_time);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="appointment-date"
                label="Appointment Date *"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formikMedicalSpecialistDetails.values.appointment_date}
                onChange={formikMedicalSpecialistDetails.handleChange}
                name="appointment_date"
                error={formikMedicalSpecialistDetails.touched.appointment_date && Boolean(formikMedicalSpecialistDetails.errors.appointment_date)}
                inputProps={{
                  min: today, // Set min attribute to today's date
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <label>Select appointment time *</label>
              <Select
                className={styles.modalSelect}
                value={formikMedicalSpecialistDetails.values.appointment_time}
                onChange={formikMedicalSpecialistDetails.handleChange}
                name="appointment_time"
                fullWidth
                error={formikMedicalSpecialistDetails.touched.appointment_time && Boolean(formikMedicalSpecialistDetails.errors.appointment_time)}
              >
                <MenuItem value="">Select appointment time</MenuItem>
                {Object.keys(AppointmentHours).map((key) => (
                  <MenuItem key={key} value={AppointmentHours[key as keyof typeof AppointmentHours]}>
                    {AppointmentHours[key as keyof typeof AppointmentHours]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid className={styles.modalButtonSection}>
            <Button className={styles.closeButton} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className={styles.continueButton}>
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Modal>
  );
};

export default MakeAppointmentModal;