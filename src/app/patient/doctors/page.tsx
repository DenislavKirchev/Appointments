"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllCities, getAllDoctors, getAllHospitals, getAllSpecialities, getPatientId } from "./data";
import { MedicalSpecialists } from "./DoctorsList";

export default async function PatientPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {
  const patientId = await getPatientId();
  const doctors = await getAllDoctors({
    filters: { ...searchParams }
  });
  const cities = await getAllCities();
  const hospitals = await getAllHospitals();
  const specialities = await getAllSpecialities();

  return (
    <Grid>
    <MedicalSpecialists
      patientId={patientId!}
      doctors={doctors}
      specialities={specialities}
      cities={cities}
      hospitals={hospitals}
    />
    </Grid>
  );
}