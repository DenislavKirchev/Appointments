import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  });

  if (user && (body.password === user.password)) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken
    };
    console.log("result", result);
    return new Response(JSON.stringify(result));
  }
  return new Response(JSON.stringify(null));
}