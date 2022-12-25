import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const habitRouter = router({
  getAll: publicProcedure.query(async () => {
    const habits = await prisma?.habit.findMany();

    return habits || [];
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        frequency: z.string(),
        points: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const habit = await prisma?.habit.create({
        data: {
          title: input.title,
          description: input.description,
          frequency: input.frequency,
          points: input.points,
        },
      });

      return habit;
    }),
});
