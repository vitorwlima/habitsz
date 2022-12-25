import { router } from "../trpc";
import { habitRouter } from "./habit";

export const appRouter = router({
  habit: habitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
