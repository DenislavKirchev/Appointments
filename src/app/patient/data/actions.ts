"use server";
import prisma from "@/lib/prisma";
import { auth } from "../../authOptions";
import { IPatientFormik } from "./PatientData";

export async function updatePatient(patientData: IPatientFormik) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await auth();
    const user = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          first_name: patientData.firstName,
          last_name: patientData.lastName,
          phone_number: patientData.phoneNumber,
          city_id: patientData.cityId,
        }
    });
    const patient = await prisma.patient.update({
        where: {
          user_id: session.user.id,
        },
        data: {
          egn: patientData.egn,
          age: patientData.age,
          gender: patientData.gender,
        }
    });

    return { patient, user};
  } catch (error) {
    console.log(error);
    throw error;
  } 
}