"use server";
import Grid from "@mui/material/Grid";
import { getDoctorData, getAllCities, getAllHospitals } from "./data";
import DoctorData from "./DoctorData";

export default async function PatientDataPage() {
  const doctorData = await getDoctorData();
  const cities = await getAllCities();
  const hospitals = await getAllHospitals();

  return (
    <Grid>
      <DoctorData
        doctorData={doctorData!}
        cities={cities!}
        hospitals={hospitals!}
      />
    </Grid>
  );
}
