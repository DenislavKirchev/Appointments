"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllCities, getAllDoctors, getAllHospitals, getAllSpecialities } from "./data";
import { MedicalSpecialists } from "./DoctorsList";
import { auth } from "../../authOptions";

export default async function PatientPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await auth();

  const doctors = await getAllDoctors({
    filters: { ...searchParams }
  });
  const cities = await getAllCities();
  const hospitals = await getAllHospitals();
  const specialities = await getAllSpecialities();

  return (
    <Grid>
    <MedicalSpecialists
      patientId={session.user.id}
      doctors={doctors}
      specialities={specialities}
      cities={cities}
      hospitals={hospitals}
    />
    </Grid>
  );
}