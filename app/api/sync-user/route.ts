import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, email, name, image } = body;

  if (!id || !email) {
    return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
  }

  const user = await prisma.user.upsert({
    where: { id },
    update: { email, name, image },
    create: { id, email, name, image },
  });

  return NextResponse.json(user);
}
