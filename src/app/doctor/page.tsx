"use server";
import { getAppointmentsForDoctor } from "./data";
import AppointmentCard from "./AppointmentCard";

export default async function DoctorPage() {
  const appointments = await  getAppointmentsForDoctor();

  return (
    <div className="appointments-list">
    {appointments.length === 0 ? (
      <p>No appointments available.</p>
    ) : (
      appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))
    )}
  </div>
  );
}