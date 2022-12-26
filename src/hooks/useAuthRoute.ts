import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const useAuthRoute = (authedRoute: boolean) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (authedRoute) {
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
