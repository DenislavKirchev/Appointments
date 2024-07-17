import { auth } from "./app/authOptions";

export default auth(() => {});
export const config = {
  matcher: [
    "/doctor/:path*",
    "/patient/:path*",
    "/super-admin/:path*"
  ]
};