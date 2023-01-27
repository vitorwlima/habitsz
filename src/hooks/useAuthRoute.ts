import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type AuthPermissions = "hasToBeAuthed" | "hasToBeUnauthed" | "any";

export const useAuthRoute = (authedRoute: AuthPermissions) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (authedRoute === "any") {
      return;
    }

    if (authedRoute === "hasToBeAuthed") {
      if (status !== "authenticated") {
        router.push("/");
      }
    } else {
      if (status === "authenticated") {
        router.push("/dashboard");
      }
    }
  }, [status, authedRoute, router]);

  return status;
};
