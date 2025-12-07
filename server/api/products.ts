import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const getAllProducts = await prisma.product.findMany();
    return { success: true, data: getAllProducts };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});
