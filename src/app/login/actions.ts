"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface IPatientFormik {
  email: string;
  password: string;
}

export async function createPatient(
  patientData: IPatientFormik
) {
  const user = await prisma.user.create({
    data: {
      email: patientData.email,
      password: patientData.password,
      role: "patient",
    },
  });

  const patient = await prisma.patient.create({
    data: {
      user_id: user.id,
    },
  });

  revalidatePath("/auth/signin");
  return JSON.stringify(patient);
}