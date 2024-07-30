"use client";
import Link from "@mui/material/Link";
import styles from "./sidebar.module.css";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export const SideBar = () => {
  const [expanded, setExpanded] = useState(true);

  const handleExpandSidebarClose = () => {
    localStorage.setItem("sidebar-state", "true");
    setExpanded(false);
  };

  const handleExpandSidebarOpen = () => {
    localStorage.setItem("sidebar-state", "false");
    setExpanded(true);
  };

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebar-state");
    setExpanded(sidebarState !== "true");
  }, []);

  return  (
    <div className={styles.sidebarOpened}>
      <div className={styles.spaceBetweenLines}>
        <Grid className={styles.closeMenuIconContainer} onClick={handleExpandSidebarClose}>
        </Grid>
        <Divider className={styles.divider} />
        <div className={styles.nav}>
          <Link href={"/doctor"}>Appointments</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/doctor/data"}>My data</Link>
        </div>
      </div>

      <div>
        <div className={styles.infoSection}>
          <p>
            <b>Връзка с нас</b>
          </p>
          <div className={styles.info}>
            <p> 0800 19 881</p>
          </div>
          <div className={styles.info}>
            <p> support-lab@evms.bg</p>
          </div>
        </div>

        <Divider className={styles.divider} />
        
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className={styles.signOut}
        >
          <p>Изход</p>
        </button> 
      </div>
    </div>
  );
};