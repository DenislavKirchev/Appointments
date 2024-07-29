"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface IMedicalSpecialistsFormik {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cityId: number;
  phoneNumber?: string;
  role: string;
  hospitalId: number;
  specialityId: number;
}

export async function createDoctor(
  medicalSpecialistData: IMedicalSpecialistsFormik
) {
  const user = await prisma.user.create({
    data: {
      email: medicalSpecialistData.email,
      password: medicalSpecialistData.password,
      first_name: medicalSpecialistData.firstName,
      last_name: medicalSpecialistData.lastName,
      role: medicalSpecialistData.role,
      phone_number: medicalSpecialistData.phoneNumber,
      city_id: medicalSpecialistData.cityId,
    },
  });

  const medicalSpecialist = await prisma.doctor.create({
    data: {
      user_id: user.id,
      speciality_id: medicalSpecialistData.specialityId,
      hospital_id: medicalSpecialistData.hospitalId,
    },
  });

  revalidatePath("/super-admin");
  return JSON.stringify(medicalSpecialist);
}