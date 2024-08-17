"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointment(
  doctorId: number, 
  patientId: number, 
  appointment_date: any, 
  appointment_time: string
) {
  const appointment = await prisma.appointment.create({
      data: {
        doctor_id : doctorId,
        patient_id : patientId, 
        appointment_date: new Date(appointment_date).toISOString(), 
        appointment_time: appointment_time
      },
  });

  revalidatePath('/patient');
  return JSON.stringify(appointment);
}

export const fetchDoctor = async (doctor_id: number) => {
  try {
    const response = await fetch(`/patient/api/appointment?doctor_id=${doctor_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};