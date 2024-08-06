import prisma from "@/lib/prisma";
import { auth } from "../authOptions";

export interface Filters {
  startDate?: string;
}

export async function getAppointmentsForDoctor({ filters }: { filters: Filters }) {
  const startTime = new Date(filters.startDate!);
  console.log(startTime)
  try {
    const session: any = await auth();
    const appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: session.user.id,
      },
    });

    const detailedAppointments = await Promise.all(
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

    return detailedAppointments;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}