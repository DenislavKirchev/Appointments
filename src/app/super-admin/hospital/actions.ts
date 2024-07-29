"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { IHospitalFormik } from "./CreateHospital";

export async function createHospital(hospitalData: IHospitalFormik) {
    try {
        const hospital = await prisma.hospital.create({
          data: {
            name: hospitalData.name,
            address: hospitalData.address,
            city_id: hospitalData.cityId,
          },
        });
    
        await revalidatePath('/super-admin');
        return JSON.stringify(hospital);
      } catch (error) {
        console.error('Error creating hospital:', error);
        throw error;
      }
  }