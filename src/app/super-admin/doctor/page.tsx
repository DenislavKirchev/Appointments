"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllCities, getAllDoctors, getAllHospitals, getAllSpecialities } from "./data";
import { MedicalSpecialists } from "./DoctorsList";

export default async function DoctorPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {

  const doctors = await getAllDoctors({
    filters: { ...searchParams }
  });
  const cities = await getAllCities();
  const hospitals = await getAllHospitals();
  const specialities = await getAllSpecialities();

  return (
    <Grid>
    <MedicalSpecialists
      doctors={doctors}
      specialities={specialities}
      cities={cities}
      hospitals={hospitals}
    />
    </Grid>
  );
}