import prisma from "@/lib/prisma";

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