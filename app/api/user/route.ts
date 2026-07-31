import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

function normalizePhone(phone: unknown) {
  if (typeof phone !== "string") return "";

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+234") && digits.length === 13) return `+${digits}`;
  if (digits.startsWith("234") && digits.length === 13) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+234${digits.slice(1)}`;
  if (digits.length === 10) return `+234${digits}`;

  return trimmed;
}

function isValidPhone(phone: string) {
  return /^\+234\d{10}$/.test(phone);
}

function getCompletedModuleIds(progresses: any[]) {
  return progresses.flatMap((progress) => {
    const content = progress.module?.content as any;
    const modules = Array.isArray(content?.modules) ? content.modules : [];
    const completedCount = progress.completed
      ? modules.length
      : Math.min(progress.currentQuestion || 0, modules.length);

    return modules.slice(0, completedCount).map((module: any) => module.id).filter(Boolean);
  });
}

function formatUser(user: any) {
  const completedModuleIds = getCompletedModuleIds(user.progresses || []);
  const certificates = (user.certificates || []).map((cert: any) => ({
    id: cert.id,
    topic: cert.topic,
    learnerName: user.name || "Askilla Learner",
    dateCompleted: cert.completedAt
      ? new Date(cert.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    totalModules: 3,
    scorePercent: 100,
    language: cert.language,
    completedAt: cert.completedAt,
    shareUrl: cert.shareUrl,
  }));

  return {
    success: true,
    user: {
      id: user.id,
      phone: user.phone,
      name: user.name,
      preferredLanguage: user.preferredLanguage,
    },
    certificates,
    completedModuleIds,
  };
}

export async function GET(req: NextRequest) {
  try {
    const phone = normalizePhone(req.nextUrl?.searchParams?.get("phone"));

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid Nigerian phone number is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { phone },
      include: {
        certificates: true,
        progresses: {
          include: { module: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        user: null,
        certificates: [],
        completedModuleIds: [],
      });
    }

    return NextResponse.json(formatUser(user));
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = normalizePhone(body.phone);
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const preferredLanguage = body.preferredLanguage === "english" ? "english" : "pidgin";

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid Nigerian phone number is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser && existingUser.name && existingUser.name.trim().length > 0) {
      return NextResponse.json({ error: "An account with this phone number already exists" }, { status: 409 });
    }

    const user = await prisma.user.upsert({
      where: { phone },
      update: {
        name,
        preferredLanguage,
      },
      create: {
        phone,
        name,
        preferredLanguage,
      },
      include: {
        certificates: true,
        progresses: {
          include: { module: true },
        },
      },
    });

    return NextResponse.json(formatUser(user));
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const currentPhone = normalizePhone(body.currentPhone || body.phone);
    const nextPhone = normalizePhone(body.phone || body.currentPhone);
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const preferredLanguage = body.preferredLanguage === "english" ? "english" : "pidgin";

    if (!currentPhone || !isValidPhone(currentPhone) || !nextPhone || !isValidPhone(nextPhone)) {
      return NextResponse.json({ error: "A valid Nigerian phone number is required" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { phone: currentPhone },
      data: {
        phone: nextPhone,
        ...(name !== undefined ? { name } : {}),
        preferredLanguage,
      },
      include: {
        certificates: true,
        progresses: {
          include: { module: true },
        },
      },
    });

    return NextResponse.json(formatUser(user));
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
