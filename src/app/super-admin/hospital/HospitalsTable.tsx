import React, { useState } from "react";
import { Box, Button, Grid, Stack, TableCell, TableRow } from "@mui/material";
import styles from "./hospitalsTable.module.css";

export const HospitalsTable = ({
  hospital
}: {
  hospital: any;
}) => {

  return (
    <TableRow
      key={hospital.id}
      className={styles.row}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0
        },
        " &:first-of-type td, &:first-of-type th": {
          borderTop: 0
        }
      }}
    >
      <TableCell className={styles.id}>{hospital.id}</TableCell>
      <TableCell className={styles.issueDate}>
        {hospital.name} 
      </TableCell>
      <TableCell>{hospital.address}</TableCell>
      <TableCell className={styles.patient}>
      {hospital.city.name}
      </TableCell>
    </TableRow>
  );
};