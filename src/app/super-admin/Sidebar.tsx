"use client";
import Link from "@mui/material/Link";
import styles from "./sidebar.module.css";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export const SideBar = () => {
  return  (
    <div className={styles.sidebarOpened}>
      <div className={styles.spaceBetweenLines}>
        <Divider className={styles.divider} />
        <div className={styles.nav}>
          <Link href={"/super-admin/doctor"}>Medical specialists</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/super-admin/hospital"}>Hospitals</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/super-admin/speciality"}>Specialities</Link>
        </div>
      </div>

      <div>
        <Divider className={styles.divider} />
        
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className={styles.signOut}
        >
          <p>Exit</p>
        </button> 
      </div>
    </div>
  );
};