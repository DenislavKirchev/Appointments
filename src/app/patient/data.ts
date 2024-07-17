import prisma from "@/lib/prisma";

export async function getAppointmentsForPatient(patientId: number) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patient_id: patientId,
      },
    });

    // Manually join doctor information based on the doctor_id
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
  } finally {
    await prisma.$disconnect();
  }
}