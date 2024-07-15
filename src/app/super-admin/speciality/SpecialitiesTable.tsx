import React, { useState } from "react";
import { Box, Button, Grid, Stack, TableCell, TableRow } from "@mui/material";
import styles from "./specialitiesTable.module.css";

export const SpecialitiesTable = ({
  speciality
}: {
  speciality: any;
}) => {

  return (
    <TableRow
      key={speciality.id}
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
      <TableCell className={styles.id}>{speciality.id}</TableCell>
      <TableCell>{speciality.name}</TableCell>
    </TableRow>
  );
};