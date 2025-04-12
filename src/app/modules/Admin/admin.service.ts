import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];
  const { page, limit } = options;

  const adminSearchAbleFields = ["name", "email", "contactNumber"];

  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = {
    AND: andCondition,
  };

  
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * limit,
    take: Number(limit)
  });
  return result;
};

export const adminService = {
  getAllFromDB,
};
