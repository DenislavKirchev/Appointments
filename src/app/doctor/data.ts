import prisma from "@/lib/prisma";

export async function getAppointmentsForDoctor(doctorId: number) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: doctorId,
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