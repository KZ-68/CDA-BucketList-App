import { db } from "@/lib/db";

export const getGoalById = async (id: string) => {
  return await db.goal.findUnique({
    where: { id },
    include: {
      collection: true,
      category: true,
    },
  });
};