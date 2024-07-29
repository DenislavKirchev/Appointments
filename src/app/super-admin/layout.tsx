import { SideBar } from "./Sidebar";
import Grid from "@mui/material/Grid";
import styles from "./layout.module.css";
import { auth } from "../authOptions";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await auth();

  return (
    <Grid container>
      {session?.user.role === "super-admin" ? (
        <Grid className={styles.layoutInnerContainer}>
          <SideBar />
          <Grid className={styles.content}>{children}</Grid>
        </Grid>
      ) : (
        <div>You are not authorized to access this page</div>
      )}
    </Grid>
  );
}