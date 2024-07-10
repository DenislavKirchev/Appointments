"use client";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Divider,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
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
import styles from "./hospitalsList.module.css";
import { HospitalsTable } from "./HospitalsTable";
import CreateHospital from "./CreateHospital";

export const Hospitals = ({
    cities,
    hospitals
  }: {
    cities: any;
    hospitals: any;
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [filters, setFilters] = useState({
      name: "",
      city: "",
    } as {
      name: string;
      city: string;
    });
    const router = useRouter();
  
    const updateFilters = () => {
  
      if (name.length >= 3) {
        if (name) {
          setFilters({
            ...filters,
            name: name
          });
        } 
      }
  
      if (name === "") {
        setFilters({
          ...filters,
          name: ""
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
      if (filters.name === "") {
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
          <Typography className={styles.pageTitle}>Hospitals</Typography>
          <Button className={styles.continieButton} onClick={openCreateMedicalSpecialistModal}>Add </Button>
        </Grid>
        {isOpen && (
          <CreateHospital 
          isOpen={isOpen} 
          onClose={closeCreateMedicalSpecialistModal} 
          cities={cities} 
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
              {(filters.name !== "" ||
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
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitals?.map((hospital: any, index: number) => (
                <HospitalsTable key={index} hospital={hospital} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    );
  };