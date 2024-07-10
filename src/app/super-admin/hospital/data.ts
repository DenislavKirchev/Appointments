import prisma from "@/lib/prisma";
export interface Filters {
  name?: string;
  city?: string;
}

const generateWhereClause = (filters: Filters) => {
  const whereClause: any = {};

  if (filters.name) {
    whereClause.name = {
      contains: filters.name,
      mode: 'insensitive',
    };
  }

  if (filters.city) {
    whereClause.city_id = parseInt(filters.city, 10);
  }

  return whereClause;
};


export async function getAllHospitals({ filters }: { filters: Filters }) {
  const whereClause = generateWhereClause(filters);
  try {
      const hospitals = await prisma.hospital.findMany({
          where: whereClause,
          include: {
            city: true 
          }
      });
    return hospitals;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCities() {
    try {
      return await prisma.city.findMany();
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