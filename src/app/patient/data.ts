import prisma from "@/lib/prisma";

export interface Filters {
    first_name?: string;
    last_name?: string;
    speciality?: string;
    city?: string;
    hospital?: string;
  }

  const generateWhereClause = (filters: Filters) => {
    const whereClause: any = {};
  
    if (filters.speciality) {
      whereClause.speciality_id = Number(filters.speciality);
    }
  
    if (filters.hospital) {
      whereClause.hospital_id = Number(filters.hospital);
    }
  
    if (filters.city) {
        whereClause.user = {
            city_id: Number(filters.city)
        };
    }
  
    if (filters.first_name || filters.last_name) {
      whereClause.user = {
        ...(filters.first_name || filters.last_name ? {
          OR: [
            filters.first_name ? { first_name: { contains: filters.first_name, mode: 'insensitive' } } : {},
            filters.last_name ? { last_name: { contains: filters.last_name, mode: 'insensitive' } } : {}
          ]
        } : {})
      };
    }
  
    return whereClause;
  };
  

export async function getAllDoctors({ filters }: { filters: Filters }) {
    const whereClause = generateWhereClause(filters);
    console.log(whereClause);
    try {
        const doctors = await prisma.doctor.findMany({
            where: whereClause,
            include: {
                user: {
                    include: {
                        city: true 
                    }
                },
                hospital: true,
                speciality: true
            }
        });
      return doctors;
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