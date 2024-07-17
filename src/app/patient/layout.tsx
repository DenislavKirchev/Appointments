import { SideBar } from "./Sidebar";
import Grid from "@mui/material/Grid";
import styles from "./layout.module.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <Grid container width={"100%"} height={"100%"}>
        <div className={styles.container}>
          <SideBar />
          {children}
        </div>
    </Grid>
  );
}