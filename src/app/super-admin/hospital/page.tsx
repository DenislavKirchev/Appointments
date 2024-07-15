"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllCities, getAllHospitals } from "./data";
import { Hospitals } from "./HospitalsList";

export default async function HospitalPageDoctorPage({
  searchParams,
}: {
  searchParams: Partial<Filters>;
}) {
  const cities = await getAllCities();
  const hospitals = await getAllHospitals({
    filters: { ...searchParams },
  });

  return (
    <Grid>
      <Hospitals cities={cities} hospitals={hospitals} />
    </Grid>
  );
}
