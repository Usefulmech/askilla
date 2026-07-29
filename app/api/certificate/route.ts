import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, topic, language, shareUrl } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Get user by phone
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if certificate already exists for this topic
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: user.id,
        topic: topic,
      },
    });

    if (existingCertificate) {
      return NextResponse.json({ success: true, certificate: existingCertificate, existing: true });
    }

    // Create new certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: user.id,
        topic: topic,
        language: language || "english",
        shareUrl: shareUrl || null,
      },
    });

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error("Error saving certificate:", error);
    return NextResponse.json({ error: "Failed to save certificate" }, { status: 500 });
  }
}
