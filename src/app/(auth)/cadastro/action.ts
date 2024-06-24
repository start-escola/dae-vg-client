"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11), 10)) return false;

  return true;
};

const signupSchema = z
  .object({
    username: z.string(),
    cpf: z
      .string()
      .refine((cpf) => validateCPF(cpf.replace(/\D/g, "")), "CPF inválido")
      .transform((cpf) => cpf.replace(/\D/g, "")),
    email: z.string().email("Email inválido"),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não combinam",
        path: ["confirmPassword"],
      });
    }
  });

export async function performSignup(prevData: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    cpf: formData.get("cpf"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:1337/api/auth/local/register",
      validatedFields.data
    );

    cookies().set("session", response.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const { status, message } = err.response?.data.error;
      if (status === 400 && message === "Email or Username are already taken") {
        return {
          errors: {
            email: ["Email já está em uso"],
          },
        };
      }
    }
  }
}

