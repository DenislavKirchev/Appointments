"use client";
import { ChangeEvent, useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import styles from "./appointment.module.css";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

const Appointment = ({ appointments }: { appointments: any[] }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>((dayjs().startOf('day')));
  const router = useRouter();

  const formatDateForURL = (date: Dayjs | null) => {
    return date ? date.add(3, "hour").toISOString() : "";
  };

  const updateURL = () => {
    const currentStartDate = formatDateForURL(startDate);
    const query = new URLSearchParams({
      startDate: currentStartDate,
    }).toString();

    router.push(query ? `?${query}` : "/");
  };

  useEffect(() => {
    updateURL();
  }, [startDate]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(event.target.value, "DD.MM.YYYY");
    setStartDate(selectedDate);
  };

  return (
    <div>
      <div className={styles.pageTitle}>Choose date</div>
      <TextField
        id="appointment-date"
        type="date"
        className={styles.pageTitle}
        InputLabelProps={{
          shrink: true,
        }}
        value={startDate ? startDate.format("YYYY-MM-DD") : ""}
        onChange={handleDateChange}
        name="appointment_date"
        inputProps={{
          min: new Date().toISOString().slice(0, 10),
        }}
      />
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <>
          {appointments.map((appointment) => (
            <div className={styles.appointment}>
             <AppointmentCard key={appointment.id} appointment={appointment} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Appointment;
