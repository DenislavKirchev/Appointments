import prisma from "@/lib/prisma";
import { auth } from "../authOptions";

export async function getAppointmentsForPatient() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await auth();
    const appointments = await prisma.appointment.findMany({
      where: {
        patient_id: session.user.id,
      },
    });

    const detailedAppointments = await Promise.all(
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

    return detailedAppointments;
  } catch (error) {
    console.log(error);
    throw error;
  } 
}