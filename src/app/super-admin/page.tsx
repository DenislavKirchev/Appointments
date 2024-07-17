"use server";
import Grid from "@mui/material/Grid";
import { auth } from "../authOptions";

const AdminPage = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await auth();
  console.log(session)

  return (
    <Grid>Admin
      
    </Grid>
  );
};

export default AdminPage;