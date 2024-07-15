import prisma from "@/lib/prisma";
export interface Filters {
  name?: string;
}

const generateWhereClause = (filters: Filters) => {
  const whereClause: any = {};

  if (filters.name) {
    whereClause.city_id = parseInt(filters.name, 10);
  }

  return whereClause;
};

export async function getAllSpecialities({ filters }: { filters: Filters }) {
  const whereClause = generateWhereClause(filters);
  try {
    const specialities = await prisma.speciality.findMany({
      where: whereClause,
    });
    return specialities;
  } catch (error) {
    console.log(error);
  }
}

