import { Card } from "@mui/material";
import styles from "./appointment.module.css";

const AppointmentCard = ({appointment}: {appointment: any}) => {
    return (
      <Card className={styles.appointmentCard}>
        <h3>Appointment with {appointment.patient.user.first_name} {appointment.patient.user.last_name}</h3>
        <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
        <p>At: {appointment.appointment_time}</p>
        <p>Age: {appointment.patient.age}</p>
      </Card>
    );
  };
  
export default AppointmentCard;