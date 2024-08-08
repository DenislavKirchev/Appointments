"use server";
import { Filters, getAppointmentsForPatient } from "./data";
import Appointment from "./Appointment";

export default async function PatientPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {
  const appointments = await  getAppointmentsForPatient({
    filters: { ...searchParams }
  });

  return (
    <Appointment appointments={appointments!} />
  );
}