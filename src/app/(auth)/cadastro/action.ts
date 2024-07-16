"use server";

import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

interface FormattedErrors {
  errors: {
    [key: string]: string[];
  };
}

interface ValidationError {
  path: string[];
  message: string;
  name: string;
}

const translate = {
  "This attribute must be unique": "CPF já cadastrado",
};

function formatErrors(errors: ValidationError[]): FormattedErrors {
  const formattedErrors: FormattedErrors = { errors: {} };
  errors?.forEach((error) => {
    const key = error.path[0];
    const message = error.message;
    if (!formattedErrors.errors[key]) {
      formattedErrors.errors[key] = [];
    }
    formattedErrors.errors[key].push(
      translate[message as keyof typeof translate] || message
    );
  });
  return formattedErrors;
}

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
    fullname: z.string(),
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
    fullname: formData.get("fullname"),
    username: randomUUID(),
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

    return "success";
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.data.error.message ===
        "Email or Username are already taken"
      ) {
        console.log(error.response.data.error.message);
        return {
          errors: {
            email: ["Este e-mail ja está sendo utilizado"],
          },
        };
      }

      const formattedError = formatErrors(
        error.response?.data.error.details.errors as ValidationError[]
      );

      return formattedError;
    } else {
      console.error(error);
    }
  }
}

