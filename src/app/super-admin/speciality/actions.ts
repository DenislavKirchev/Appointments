"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface ISpecialitiesFormik {
    name: string;
}

export async function createSpeciality(specialityData: ISpecialitiesFormik) {

  const speciality = await prisma.speciality.create({
      data: {
          name: specialityData.name,
      },
  });

  revalidatePath('/super-admin/speciality');
  return JSON.stringify(speciality);
}