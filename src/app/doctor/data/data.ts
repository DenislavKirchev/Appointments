import prisma from "@/lib/prisma";
import { auth } from "../../authOptions";

export async function getDoctorData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await auth();
    const doctorData = await prisma.doctor.findFirst({
      where: {
        user_id: session.user.id,
      },
      include: {
        user: true,
        speciality: true
      }
    });

    return doctorData;
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

export async function getAllHospitals() {
  try {
    return await prisma.hospital.findMany();
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSpecialities() {
  try {
    return await prisma.speciality.findMany();
  } catch (error) {
    console.log(error);
  }
}