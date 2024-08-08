"use server";
import { Filters, getAppointmentsForDoctor } from "./data";
import Appointment from "./Appointment";

export default async function DoctorPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {
  const appointments = await  getAppointmentsForDoctor({
    filters: { ...searchParams }
  });
  
  return (
    <Appointment appointments={appointments!} />
  );
}