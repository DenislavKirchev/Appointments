"use client";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import styles from "./doctorsList.module.css";
import { MedicalSpecialistsTable } from "./DoctorsTable";
import CreateDoctor from "./CreateDoctor";

export const MedicalSpecialists = ({
    doctors,
    cities,
    specialities,
    hospitals
  }: {
    doctors: any;
    cities: any;
    specialities: any;
    hospitals: any;
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [filters, setFilters] = useState({
      first_name: "",
      last_name: "",
      speciality: "",
      city: "",
      hospital: ""
    } as {
      first_name: string;
      last_name: string;
      speciality: string;
      city: string;
      hospital: string;
    });
    const router = useRouter();
  
    const updateFilters = () => {
      const [firstName, secondName] = name.split(" ");
  
      if (name.length >= 3) {
        if (firstName && secondName) {
          setFilters({
            ...filters,
            first_name: firstName,
            last_name: secondName
          });
        } else {
          setFilters({
            ...filters,
            first_name: firstName,
            last_name: firstName
          });
        }
      }
  
      if (name === "") {
        setFilters({
          ...filters,
          first_name: "",
          last_name: ""
        });
      }
    };
  
    const keyToValueFiltersTag = (key: string, value: string) => {
    //   if (key === "status") {
    //     return (keyToTextUserStatus as { [key: string]: string })[value] as string;
    //   }
  
      return value;
    };
  
    const updateURL = () => {
      if (filters.first_name === "" && filters.last_name === "") {
        setName("");
      }
  
      const query = new URLSearchParams({ ...filters }).toString();
      router.push(query ? `?${query}` : "/");
    };
  
    useEffect(() => {
      updateFilters();
    }, [name]);
  
    useEffect(() => {
      updateURL();
    }, [filters]);
  
    const openCreateMedicalSpecialistModal = () => {
      setIsOpen(true);
    };
  
    const closeCreateMedicalSpecialistModal = () => {
      setIsOpen(false);
    };
  
    return (
      <Stack className={styles.container}>
        <Grid className={styles.titleSection}>
          <Typography className={styles.pageTitle}>Medical specialists</Typography>
          <Button className={styles.continieButton} onClick={openCreateMedicalSpecialistModal}>Add </Button>
        </Grid>
        {isOpen && (
          <CreateDoctor 
          isOpen={isOpen} 
          onClose={closeCreateMedicalSpecialistModal} 
          cities={cities} 
          hospitals={hospitals} 
          specialities={specialities} 
          />
        )}
        <Divider className={styles.divider} />
        <Stack className={styles.filtersSection}>
          <Stack className={styles.filters}>
            <TextField
              id="outlined-search"
              placeholder={"Names"}
              type="search"
              className={styles.searchField}
              InputProps={{
                className: styles.customInput,
              }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Autocomplete
            disablePortal
            id="hospital-autocomplete"
            options={hospitals}
            getOptionLabel={(option) => option.name}
            value={hospitals.find((hospital: any) => hospital.id === filters.hospital) || null}
            className={styles.hospitalFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hospital"
                InputLabelProps={{ className: styles.customInputLabel }}
                InputProps={{
                  ...params.InputProps,
                  className: styles.customInput
                }}
              />
            )}
            onChange={(event, value) => {
              setFilters({ ...filters, hospital: value ? value.id : "" });
            }}
          />
        <Autocomplete
            disablePortal
            id="speciality-autocomplete"
            options={specialities}
            getOptionLabel={(option) => option.name}
            value={specialities.find((speciality: any) => speciality.id === filters.speciality) || null}
            className={styles.hospitalFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Speciality"
                InputLabelProps={{ className: styles.customInputLabel }}
                InputProps={{
                  ...params.InputProps,
                  className: styles.customInput
                }}
              />
            )}
            onChange={(event, value) => {
              setFilters({ ...filters, speciality: value ? value.id : "" });
            }}
          />
          <Autocomplete
            disablePortal
            id="speciality-autocomplete"
            options={cities}
            getOptionLabel={(option) => option.name}
            value={cities.find((city: any) => city.id === filters.city) || null}
            className={styles.hospitalFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cities"
                InputLabelProps={{ className: styles.customInputLabel }}
                InputProps={{
                  ...params.InputProps,
                  className: styles.customInput
                }}
              />
            )}
            onChange={(event, value) => {
              setFilters({ ...filters, city: value ? value.id : "" });
            }}
          />
          </Stack>
          <Stack className={styles.filterButtons}>
            <Stack className={styles.filterButtonsInner}>
              {(filters.first_name !== "" ||
                filters.last_name !== "" ||
                filters.speciality !== "" ||
                filters.hospital !== "" ||
                filters.city !== "")}
            </Stack>
          </Stack>
        </Stack>
        <Stack className={styles.selectedFiltersSection}>
          {Object.entries(filters).map(([key, value]) =>
            value ? (
              <Box key={key} className={styles.selectedFilter}>
                <Typography className={styles.selectedFilterText}>
                  {keyToValueFiltersTag(key, value)}
                </Typography>
                <IconButton
                  onClick={() => {
                    setFilters({ ...filters, [value]: "" });
                  }}
                  className={styles.selectedFilterRemoveButton}
                >
                </IconButton>
              </Box>
            ) : null
          )}
        </Stack>
        <Box className={styles.card}>
          <Table>
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell>ID</TableCell>
                <TableCell>Names</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Speciality</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors?.map((doctor: any, index: number) => (
                <MedicalSpecialistsTable key={index} medicalSpecialist={doctor} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    );
  };