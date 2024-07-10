"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllCities, getAllHospitals, getAllSpecialities } from "./data";
import CreateHospital from "./CreateHospital";
import { Hospitals } from "./HospitalsList";

export default async function HospitalPageDoctorPage({
  searchParams
}: {
  searchParams: Partial<Filters>;
}) {

  const cities = await getAllCities();
  const hospitals = await getAllHospitals({
    filters: { ...searchParams }
  });
  console.log(hospitals)

  return (
    <Grid>
      {/* <CreateHospital cities={cities!} /> */}
      <Hospitals      
      cities={cities}
      hospitals={hospitals}
      />
    </Grid>
  );
};