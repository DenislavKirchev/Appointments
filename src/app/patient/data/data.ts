import prisma from "@/lib/prisma";
import { auth } from "../../authOptions";

export async function getPatientData() {
  try {
    const session: any = await auth();
    const patientData = await prisma.patient.findFirst({
      where: {
        user_id: session.user.id,
      },
      include: {
        user: true
      }
    });

    return patientData;
  } catch (error) {
    console.log(error);
    throw error;
  } 
}

export async function getAllCities() {
    try {
      return await prisma.city.findMany();
    } catch (error) {
      console.log(error);
    }
}