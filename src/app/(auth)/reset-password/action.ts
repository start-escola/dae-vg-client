"use server";

import api from "@/utils/api";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

function formatErrors(errors: ValidationError[]): FormattedErrors {
  const formattedErrors: FormattedErrors = { errors: {} };
  errors?.forEach((error) => {
    const key = error.path[0];
    const message = error.message;
    if (!formattedErrors.errors[key]) {
      formattedErrors.errors[key] = [];
    }
    formattedErrors.errors[key].push(message);
  });
  return formattedErrors;
}

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

const resetSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
    code: z.string(),
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

export async function performReset(prevData: any, formData: FormData) {
  const validatedFields = resetSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await api.post("/auth/reset-password", {
      password: validatedFields.data.password,
      passwordConfirmation: validatedFields.data.confirmPassword,
      code: validatedFields.data.code,
    });

    return "success";
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedError = formatErrors(
        error.response?.data?.error?.details?.errors as ValidationError[]
      );

      return formattedError;
    } else {
      console.error(error);
    }
  }
}
