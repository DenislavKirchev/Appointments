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
import styles from "./specialities.module.css";
import { SpecialitiesTable } from "./SpecialitiesTable";
import CreateSpecialityForm from "./CreateSpeciality";

export const Specialities = ({
    specialities,
  }: {
    specialities: any;
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [filters, setFilters] = useState({
      speciality: "",
    } as {
      speciality: string;
    });
    const router = useRouter();
  
    const keyToValueFiltersTag = (key: string, value: string) => {
    //   if (key === "status") {
    //     return (keyToTextUserStatus as { [key: string]: string })[value] as string;
    //   }
  
      return value;
    };
  
    const updateURL = () => {
  
      const query = new URLSearchParams({ ...filters }).toString();
      router.push(query ? `?${query}` : "/");
    };
  
    useEffect(() => {
      updateURL();
    }, [filters]);
  
    const openCreateSpecialityModal = () => {
      setIsOpen(true);
    };
  
    const closeCreateSpecialityModal = () => {
      setIsOpen(false);
    };
  
    return (
      <Stack className={styles.container}>
        <Grid className={styles.titleSection}>
          <Typography className={styles.pageTitle}>Specialities</Typography>
          <Button className={styles.continieButton} onClick={openCreateSpecialityModal}>Add </Button>
        </Grid>
        {isOpen && (
          <CreateSpecialityForm 
          isOpen={isOpen} 
          onClose={closeCreateSpecialityModal} 
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
          </Stack>
          <Stack className={styles.filterButtons}>
            <Stack className={styles.filterButtonsInner}>
              {(filters.speciality !== "")}
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
                <TableCell>Name of speciality</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialities?.map((speciality: any, index: number) => (
                <SpecialitiesTable key={index} speciality={speciality} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    );
  };