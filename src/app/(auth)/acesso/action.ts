"use server";
import api from "@/utils/api";
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

const createSessionSchema = {
  person: z.object({
    identifier: z
      .string()
      .refine((cpf) => validateCPF(cpf.replace(/\D/g, "")), "CPF inválido")
      .transform((cpf) => cpf.replace(/\D/g, "")),
    password: z.string(),
  }),
  company: z.object({
    identifier: z
      .string()
      .refine((cnpj) => cnpj.replace(/\D/g, ""), "CNPJ inválido")
      .transform((cnpj) => cnpj.replace(/\D/g, "")),
    password: z.string(),
  }),
};

export async function createSession(prevState: any, formData: FormData) {
  const isJuridic = Boolean(formData.get("isJuridic"));

  try {
    const validatedFields = createSessionSchema[
      isJuridic ? "company" : "person"
    ].safeParse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { data } = await api.post("/auth", validatedFields.data);

    cookies().set("session", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return "success";
  } catch (err) {
    return {
      errors: {
        password: [
          isJuridic
            ? "CNPJ e/ou senha incorretos"
            : "CPF e/ou senha incorretos",
        ],
      },
    };
  }
}

