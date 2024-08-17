"use server";
import prisma from "@/lib/prisma";
import { auth } from "../../authOptions";
import { IDoctorFormik } from "./DoctorData";

export async function updateDoctor(doctorData: IDoctorFormik) {
  try {
    const session: any = await auth();
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        first_name: doctorData.firstName,
        last_name: doctorData.lastName,
        phone_number: doctorData.phoneNumber,
        city_id: doctorData.cityId,
      },
    });
    const doctor = await prisma.doctor.update({
      where: {
        user_id: session.user.id,
      },
      data: {
        hospital_id: doctorData.hospitalId
      },
    });

    return { doctor, user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
