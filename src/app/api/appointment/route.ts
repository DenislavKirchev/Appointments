import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams: { [p: string]: string } = Object.fromEntries(url.searchParams.entries());

    const appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: Number(queryParams.doctorId)
      }
    });
    
    return new Response(JSON.stringify(appointments));
  } catch (error) {
    console.error("Error processing GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}