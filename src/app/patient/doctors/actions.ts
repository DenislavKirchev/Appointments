"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointment(doctorId: number, patientId: number, appointment_date: any, appointment_time: string) {

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