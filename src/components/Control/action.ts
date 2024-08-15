"use server";

import { cookies } from "next/headers";

export async function changeModifier(modifier: number) {
  if (modifier > 4 || modifier < -4) {
    return;
  }

  cookies().set("modifier", `${modifier}`, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
