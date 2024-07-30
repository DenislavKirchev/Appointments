import { SideBar } from "./Sidebar";
import Grid from "@mui/material/Grid";
import styles from "./layout.module.css";
import { auth } from "../authOptions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await auth();

  return (
    <Grid container width={"100%"} height={"100%"}>
      {session?.user.role === "super-admin" ? (
        <div className={styles.container}>
          <SideBar />
          {children}
        </div>
      ) : (
        <div>You are not authorized to access this page</div>
      )}
    </Grid>
  );
}
