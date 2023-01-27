import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import type { AuthPermissions } from "./useAuthRoute";
import { useAuthRoute } from "./useAuthRoute";

type Props = {
  authLevel: AuthPermissions;
};

export const usePage = ({ authLevel }: Props) => {
  const authStatus = useAuthRoute(authLevel);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = session?.user?.name?.split(" ")[0] ?? "User";

  const { data: habits, isLoading: isHabitsLoadingQuery } =
    trpc.habit.getAll.useQuery();
  const isHabitsLoading = isHabitsLoadingQuery || habits === undefined;
  const { data: completions, isLoading: isCompletionsLoadingQuery } =
    trpc.habit.getAllCompletions.useQuery();
  const isCompletionsLoading =
    isCompletionsLoadingQuery || completions === undefined;

  const switchIsSidebarOpen = () => {
    setIsSidebarOpen((o) => !o);
  };

  return {
    authStatus,
    switchIsSidebarOpen,
    isSidebarOpen,
    userName,
    isHabitsLoading,
    isCompletionsLoading,
    habits: habits ?? [],
    completions: completions ?? [],
  };
};
