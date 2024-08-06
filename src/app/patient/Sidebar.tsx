"use client";
import Link from "@mui/material/Link";
import styles from "./sidebar.module.css";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export const SideBar = () => {

  return  (
    <div className={styles.sidebarOpened}>
      <div className={styles.spaceBetweenLines}>
        <Divider className={styles.divider} />
        <div className={styles.nav}>
          <Link href={"/patient"}>Appointments</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/patient/doctors"}>Medical specialists</Link>
        </div>
        <div className={styles.nav}>
          <Link href={"/patient/data"}>My data</Link>
        </div>
      </div>

      <div>
        <div className={styles.infoSection}>
          <p>
            <b>Support</b>
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
          <p>Exit</p>
        </button> 
      </div>
    </div>
  );
};