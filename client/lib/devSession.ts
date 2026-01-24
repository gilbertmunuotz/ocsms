import { User } from "next-auth";

export function getDevSession() {
  if (process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH !== "true") {
    return null;
  }

  const role = process.env.NEXT_PUBLIC_DEV_ROLE || "BUYER";

  return {
    user: {
      id: "dev-user",
      email: "dev@local.test",
      name: "Dev User",
      role,
      accessToken: "dev-token",
    } as User,
  };
}
