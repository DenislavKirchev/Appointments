"use client";
import Button from "@mui/material/Button";
import { Grid, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import styles from "./makeAppointment.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { createAppointment } from "./actions";
import { useEffect, useState } from "react";

interface CreateMedicalSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: number;
  patientId: number
}

interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time: string;
}

const validationSchema = yup.object({
  appointment_date: yup.date().required("Please choose a date and time"),
  appointment_time: yup.string().required("Appointment time is required")
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
  patientId,
  doctorId
}: CreateMedicalSpecialistModalProps) => {
  const today = new Date().toISOString().split('T')[0]; 
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);

  const formikMedicalSpecialistDetails = useFormik<any>({
    initialValues: {
      patientId: patientId,
      appointment_date: "", 
      appointment_time: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  useEffect(() => {
    if (isOpen) {
     fetchAppointments(doctorId);
    }
  }, [isOpen]);

  useEffect(() => {
    if (formikMedicalSpecialistDetails.values.appointment_date) {
      const selectedDateAppointments = appointments.filter(
        appointment =>
          appointment.appointment_date.split('T')[0] === formikMedicalSpecialistDetails.values.appointment_date
      );
      setDisabledTimes(selectedDateAppointments.map(appointment => appointment!.appointment_time!));
    } else {
      setDisabledTimes([]);
    }
  }, [formikMedicalSpecialistDetails.values.appointment_date, appointments]);

  const fetchAppointments = async (doctorId: number) => {
    try {
      const response = await fetch(`/api/appointment?doctorId=${doctorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      setAppointments(result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

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
                min: today,
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
                <MenuItem
                  key={key}
                  value={AppointmentHours[key as keyof typeof AppointmentHours]}
                  disabled={disabledTimes.includes(AppointmentHours[key as keyof typeof AppointmentHours])}
                >
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