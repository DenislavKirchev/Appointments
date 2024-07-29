import prisma from "@/lib/prisma";
import { auth } from "../authOptions";

export async function getAppointmentsForDoctor() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await auth();
    const appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: session.user.id,
      },
    });

    // Manually join doctor information based on the doctor_id
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