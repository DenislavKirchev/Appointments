"use server";
import Grid from "@mui/material/Grid";
import {  getPatientData, getAllCities } from "./data";
import PatientData from "./PatientData";

export default async function PatientDataPage() {
  const patientData = await getPatientData();
  const cities = await getAllCities();

  return (
    <Grid>
      <PatientData patientData={patientData} cities={cities!}/>
    </Grid>
  );
}