"use client";
import Link from "@mui/material/Link";
import styles from "./sidebar.module.css";
import Divider from "@mui/material/Divider";
import React from "react";
import { signOut } from "next-auth/react";

export const SideBar = () => {
  return  (
    <div className={styles.sidebarOpened}>
      <div className={styles.spaceBetweenLines}>
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