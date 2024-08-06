"use server";
import { Filters, getAppointmentsForDoctor } from "./data";
import AppointmentCard from "./AppointmentCard";
import Appointment from "./Appointment";

const DoctorPage = async ({ searchParams }: { searchParams: Filters }) => {
  const appointments = await  getAppointmentsForDoctor({
    filters: { ...searchParams }
  });

  return (
    <div>
    {appointments.length === 0 ? (
      <p>No appointments available.</p>
    ) : (
        <Appointment appointments={appointments} />
    )}
  </div>
  );
}

export default DoctorPage;