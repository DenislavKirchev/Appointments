"use server";
import { getAppointmentsForPatient } from "./data";
import AppointmentCard from "./AppointmentCard";

export default async function PatientPage() {
  const appointments = await  getAppointmentsForPatient(6);

  return (
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
  );
}