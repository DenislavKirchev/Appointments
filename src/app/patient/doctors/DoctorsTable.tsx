import React, { useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import styles from "./doctorsTable.module.css";
import MakeAppointmentModal from "./MakeAppointmentModal";

export const MedicalSpecialistsTable = ({
  patientId,
  medicalSpecialist
}: {
  patientId: number
  medicalSpecialist: any;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCreateMedicalSpecialistModal = () => {
    setIsOpen(true);
  };

  const closeCreateMedicalSpecialistModal = () => {
    setIsOpen(false);
  };

  return (
    <TableRow
      key={medicalSpecialist.id}
      className={styles.row}
      sx={{ "&:last-child td, &:last-child th": {border: 0}," &:first-of-type td, &:first-of-type th": {borderTop: 0}}}
    >
      <TableCell className={styles.id}>{medicalSpecialist.user_id}</TableCell>
      <TableCell className={styles.issueDate}>
        {medicalSpecialist.title} {medicalSpecialist.user.first_name}{" "}
        {medicalSpecialist.user.last_name}
      </TableCell>
      <TableCell>{medicalSpecialist.hospital.name}</TableCell>
      <TableCell className={styles.patient}>
      {medicalSpecialist.user.city.name}
      </TableCell>
      <TableCell className={styles.localisation}>{medicalSpecialist.speciality.name}</TableCell>
      <TableCell className={styles.patient}>{medicalSpecialist.user.email}</TableCell>
      <TableCell className={styles.patient}>{medicalSpecialist.user.phone_number}</TableCell>
      <TableCell className={styles.buttonsCell} align={"right"}>
      <Button className={styles.continueButton} onClick={openCreateMedicalSpecialistModal}>
            Book
      </Button>
      </TableCell>
      {isOpen && (
          <MakeAppointmentModal 
          patientId={patientId} 
          doctorId={medicalSpecialist.id} 
          isOpen={isOpen} 
          onClose={closeCreateMedicalSpecialistModal} 
          />
      )}
    </TableRow>
  );
};