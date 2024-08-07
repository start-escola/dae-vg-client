import { z } from "zod";
import api from "@/utils/api";

const forgotSchema = z.object({
  email: z.string().email(),
});

export async function performForgetPassword(prevData: any, formData: FormData) {
  const validatedFields = forgotSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await api.post("/auth/forgot-password", {
      email: validatedFields.data.email,
    });

    return "success";
  } catch (err) {
    console.log(err);
  }
}
