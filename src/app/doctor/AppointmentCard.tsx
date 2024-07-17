

const AppointmentCard = ({appointment}: {appointment: any}) => {
    return (
      <div className="appointment-card">
        <h3>Appointment with {appointment.patient.user.first_name} {appointment.patient.user.last_name}</h3>
        <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
        <p>Time: {appointment.appointment_time}</p>
        <p>Age: {appointment.patient.age}</p>
      </div>
    );
  };
  
  
  export default AppointmentCard;