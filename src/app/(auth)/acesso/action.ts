"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const createSessionSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export async function createSession(prevState: any, formData: FormData) {
  const validatedFields = createSessionSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  const { data } = await axios.post(
    "http://127.0.0.1:1337/api/auth/local/",
    validatedFields.data
  );

  cookies().set("session", data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

