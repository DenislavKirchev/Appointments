import prisma from "@/lib/prisma";
import { auth } from "../authOptions";

export interface Filters {
  startDate?: string;
}

export async function getAppointmentsForDoctor({ filters }: { filters: Filters }) {
  const startDate = new Date(filters.startDate!);
  console.log()
  try {
    const session: any = await auth();
    let appointments;
    let detailedAppointments;
    if(filters.startDate){
    appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: session.user.id,
        appointment_date: startDate
      },
    });
    detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await prisma.patient.findUnique({
          where: { id: appointment.patient_id },
          include: {
            user: true,
          },
        });
        return {
          ...appointment,
          patient,
        };
      })
    );
  } else {
    appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: session.user.id,
      },
    });

    detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await prisma.patient.findUnique({
          where: { id: appointment.patient_id },
          include: {
            user: true,
          },
        });
        return {
          ...appointment,
          patient,
        };
      })
    );
  }

    return detailedAppointments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}