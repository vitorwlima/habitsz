import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const habitRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const habits = await prisma?.habit.findMany({
        where: {
          userId: input.userId,
        },
      });

      return habits || [];
    }),

  getAllCompletions: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const completions = await prisma?.habitCompletion.findMany({
        where: {
          habit: {
            userId: input.userId,
          },
        },
      });

      return completions || [];
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        frequency: z.string(),
        points: z.number(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const habit = await prisma?.habit.create({
        data: {
          title: input.title,
          description: input.description,
          frequency: input.frequency,
          points: input.points,
          userId: input.userId,
        },
      });

      return habit;
    }),

  updateHabitCompletion: publicProcedure
    .input(
      z.object({
        habitId: z.string(),
        date: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const currentHabitCompletion = await prisma?.habitCompletion.findFirst({
        where: {
          habitId: input.habitId,
          date: input.date,
        },
      });

      if (currentHabitCompletion) {
        const habitCompletion = await prisma?.habitCompletion.update({
          where: {
            id: currentHabitCompletion.id,
          },
          data: {
            completed: input.completed,
          },
        });

        return habitCompletion;
      }

      const habitCompletion = await prisma?.habitCompletion.create({
        data: {
          habitId: input.habitId,
          completed: true,
          date: input.date,
        },
      });

      return habitCompletion;
    }),
});
