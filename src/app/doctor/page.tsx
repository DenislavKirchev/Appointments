"use server";
import { getAppointmentsForDoctor } from "./data";
import AppointmentCard from "./AppointmentCard";

export default async function DoctorPage() {
  const appointments = await  getAppointmentsForDoctor(3);
  console.log(appointments)

  return (
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
  );
}