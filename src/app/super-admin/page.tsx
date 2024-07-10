"use server";
import Grid from "@mui/material/Grid";
import CreateDoctor from "./CreateDoctor";
import { getAllCities, getAllHospitals, getAllSpecialities } from "./data";
import CreateHospital from "./CreateHospital";

const AdminPage = async () => {
  const cities = await getAllCities();
  const hospitals = await getAllHospitals();
  const specialities = await getAllSpecialities();

  return (
    <Grid>Admin
      <CreateDoctor cities={cities!} hospitals={hospitals!} specialities={specialities!}/>
      <CreateHospital cities={cities!} hospitals={hospitals!} specialities={specialities!}/>
    </Grid>
  );
};

export default AdminPage;