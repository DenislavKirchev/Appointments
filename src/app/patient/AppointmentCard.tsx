import { Card } from "@mui/material";
import styles from "./appointment.module.css";

const AppointmentCard = ({appointment}: {appointment: any}) => {
    return (
      <Card className={styles.appointmentCard}>
        <h3>Appointment with Dr. {appointment.doctor.user.first_name} {appointment.doctor.user.last_name}</h3>
        <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
        <p>Time: {appointment.appointment_time}</p>
        <p>Speciality: {appointment.doctor.speciality.name}</p>
        <p>Hospital: {appointment.doctor.hospital.name}</p>
        <p>Address: {appointment.doctor.hospital.address}</p>
      </Card>
    );
  };
  
  
  export default AppointmentCard;