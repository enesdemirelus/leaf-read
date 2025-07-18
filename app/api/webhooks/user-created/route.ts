import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const body = await req.json();

  const { id, email_addresses, image_url, first_name, last_name } = body;

  const email = email_addresses?.[0]?.email_address;

  if (!id || !email) {
    return NextResponse.json({ error: "Missing user ID or email" }, { status: 400 });
  }

  await prisma.user.upsert({
    where: { id },
    update: {
      email,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      image: image_url,
    },
    create: {
      id,
      email,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      image: image_url,
    },
  });

  return NextResponse.json({ success: true });
}
