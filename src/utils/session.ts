import { cookies } from "next/headers";
import type {
  ISessionContextAuthenticated,
  ISessionContextLoading,
  ISessionContextUnauthenticated,
} from "@/app/session-provider";
import axios from "axios";

export async function getSession(): Promise<
  | ISessionContextUnauthenticated
  | ISessionContextAuthenticated
  | ISessionContextLoading
> {
  const session = cookies().get("session")?.value;

  try {
    if (typeof session !== "string") {
      return {
        user: null,
        jwt: null,
        status: "unauthenticated",
      };
    }

    const { data } = await axios.get("http://127.0.0.1:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return {
      user: data,
      jwt: session,
      status: "authenticated",
    };
  } catch (error) {
    return {
      user: null,
      jwt: null,
      status: "unauthenticated",
    };
  }
}

