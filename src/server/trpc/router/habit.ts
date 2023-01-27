import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const habitRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const habits = await ctx.prisma.habit.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return habits ?? [];
  }),

  getAllCompletions: protectedProcedure.query(async ({ ctx }) => {
    const completions = await ctx.prisma.habitCompletion.findMany({
      where: {
        habit: {
          userId: ctx.user.id,
        },
      },
    });

    return completions ?? [];
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        frequency: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const habit = await ctx.prisma.habit.create({
        data: {
          title: input.title,
          frequency: input.frequency,
          userId: ctx.user.id,
        },
      });

      return habit;
    }),

  updateHabitCompletion: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        date: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const currentHabitCompletion = await ctx.prisma.habitCompletion.findFirst(
        {
          where: {
            habitId: input.habitId,
            date: input.date,
          },
        }
      );

      if (currentHabitCompletion) {
        const habitCompletion = await ctx.prisma.habitCompletion.update({
          where: {
            id: currentHabitCompletion.id,
          },
          data: {
            completed: input.completed,
          },
        });

        return habitCompletion;
      }

      const habitCompletion = await ctx.prisma.habitCompletion.create({
        data: {
          habitId: input.habitId,
          completed: true,
          date: input.date,
        },
      });

      return habitCompletion;
    }),

  delete: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.habitCompletion.deleteMany({
        where: {
          habitId: input.habitId,
        },
      });

      const habit = await ctx.prisma.habit.delete({
        where: {
          id: input.habitId,
        },
      });

      return habit;
    }),

  update: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        title: z.string(),
        frequency: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const habit = await ctx.prisma.habit.update({
        where: {
          id: input.habitId,
        },
        data: {
          title: input.title,
          frequency: input.frequency,
        },
      });

      return habit;
    }),
});
