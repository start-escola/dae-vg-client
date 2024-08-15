import { cookies } from "next/headers";

export async function getModifier(): Promise<number> {
  const modifier = Number(cookies().get("modifier")?.value) || 0;
  return modifier;
}
