import prisma from "@/lib/prisma";
import { auth } from "../authOptions";

export interface Filters {
  startDate?: string;
}

export async function getAppointmentsForPatient({
  filters,
}: {
  filters: Filters;
}) {
  try {
    const session: any = await auth();
    const patient =  await prisma.patient.findFirst({
      where: {
        user_id: session.user.id
      }
    });

    const startDate = new Date(filters.startDate!);
    let appointments;
    let detailedAppointments;

    if (filters.startDate) {
      appointments = await prisma.appointment.findMany({
        where: {
          patient_id: patient!.id,
          appointment_date: startDate,
        },
      });
      detailedAppointments = await Promise.all(
        appointments.map(async (appointment) => {
          const doctor = await prisma.doctor.findUnique({
            where: { id: appointment.doctor_id },
            include: {
              user: true,
              speciality: true,
              hospital: true,
            },
          });
          return {
            ...appointment,
            doctor,
          };
        })
      );
    } else {
      appointments = await prisma.appointment.findMany({
        where: {
          patient_id: session.user.id,
        },
      });

      detailedAppointments = await Promise.all(
        appointments.map(async (appointment) => {
          const doctor = await prisma.doctor.findUnique({
            where: { id: appointment.doctor_id },
            include: {
              user: true,
              speciality: true,
              hospital: true,
            },
          });
          return {
            ...appointment,
            doctor,
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