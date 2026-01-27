"use server";

import { SERVER_URI } from "@/constants/constant";
import { auth } from "@/auth";

export async function sendInquiry(
  vehicleId: number,
  message: string
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${SERVER_URI}/api/v1/inquiry/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({
        vehicleId,
        message,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to send inquiry");
  }

  return res.json();
}
