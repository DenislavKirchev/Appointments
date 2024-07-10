"use client";
import Link from "@mui/material/Link";
import styles from "./sidebar.module.css";
import Divider from "@mui/material/Divider";
import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

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
          <Link href={"/doctor"}>Начало</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/super-admin/doctor"}>Medical specialists</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/super-admin/hospital"}>Hospitals</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/doctor/lab-cards"}>Лаборатории</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/doctor/documents"}>Документи</Link>
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
        {/* <div className={styles.info}>
          <Link href={"/doctor/profile"}>
            <Grid container className={styles.info}>
              <Image
                src="/user.svg"
                alt="User"
                className={styles.homeIcon}
                width={24}
                height={24}
              />
              <p>
                {user.first_name} {user.last_name}
              </p>
            </Grid>
          </Link>
        </div> */}

        {/* <Divider className={styles.divider} />
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className={styles.signOut}
        >
          <Image
            src="/logout.svg"
            alt="LogOut"
            className={styles.homeIcon}
            width={24}
            height={24}
          />
          <p>Изход</p>
        </button> */}
      </div>
    </div>
  );
};