"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { IHospitalFormik } from "./CreateHospital";

export async function createHospital(hospitalData: IHospitalFormik) {
    try {
        // Create a new hospital entry in the database
        const hospital = await prisma.hospital.create({
          data: {
            name: hospitalData.name,
            address: hospitalData.address,
            city_id: hospitalData.cityId,
          },
        });
    
        // Revalidate the specified path
        await revalidatePath('/super-admin');
    
        // Return the created hospital as a JSON string
        return JSON.stringify(hospital);
      } catch (error) {
        console.error('Error creating hospital:', error);
        throw error;
      }
  }