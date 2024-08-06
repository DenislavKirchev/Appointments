"use client";
import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { useRouter } from "next/navigation";
import styles from "./appointment.module.css";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";

const Appointment = ({appointments}: {appointments: any}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const router = useRouter();

  const updateURL = () => {
    const currentStartDate = startDate ? startDate.toISOString() : '';
    const query = new URLSearchParams({
      startDate: currentStartDate,
    }).toString();

    router.push(query ? `?${query}` : '/');
  };

  useEffect(() => {
    updateURL();
  }, [startDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    updateURL();
  };

    return (
      <div className="appointment-card">
         <div>Filter</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={startDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
        
        {appointments.map((appointment: any) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
      </div>
    );
  };
  
  
  export default Appointment;