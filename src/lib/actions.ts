"use server";
import { signIn } from "@/app/authOptions";

export async function signinAction(formData: FormData) {
  await signIn("credentials", { ...formData, redirectTo: "/" });
}
