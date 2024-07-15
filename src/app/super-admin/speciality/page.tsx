"use server";
import Grid from "@mui/material/Grid";
import { Filters, getAllSpecialities } from "./data";
import { Specialities } from "./Specialities";

export default async function SpecialitiesPage({
  searchParams,
}: {
  searchParams: Partial<Filters>;
}) {
  const specialities = await getAllSpecialities({
    filters: { ...searchParams },
  });

  return (
    <Grid>
      <Specialities specialities={specialities}/>
    </Grid>
  );
}
