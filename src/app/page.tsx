import { redirect } from "next/navigation";
import { auth } from "./authOptions";

export default async function Home() {
  const session: any = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  } else if (session?.user.role === "super-admin") {
    redirect("/super-admin");
  } else if (session?.user.role === "doctor") {
    redirect("/doctor");
  } else if (session?.user.role === "patient") {
    redirect("/patient");
  }

  return <main></main>;
}