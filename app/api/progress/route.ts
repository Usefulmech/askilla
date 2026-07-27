import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, moduleId, questionIndex, userAnswer, isCorrect, feedbackGiven, language } = body;

    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    try {
      const cleanUserId = userId || "user_guest";

      // Ensure the user exists in the database first to avoid foreign key violations
      await prisma.user.upsert({
        where: { id: cleanUserId },
        update: {},
        create: {
          id: cleanUserId,
          phone: cleanUserId,
          name: "Learner",
          preferredLanguage: language || "english",
        },
      });

      // Save dataset attempt entry to PostgreSQL
      const attempt = await prisma.questionAttempt.create({
        data: {
          userId: cleanUserId,
          moduleId: moduleId,
          questionIndex: questionIndex || 0,
          userAnswer: userAnswer || "",
          isCorrect: Boolean(isCorrect),
          feedbackGiven: feedbackGiven || "",
          language: language || "english",
        },
      });

      return NextResponse.json({ success: true, attempt });
    } catch (dbErr) {
      console.warn("PostgreSQL attempt save skipped (offline mode):", dbErr);
      return NextResponse.json({ success: true, offline: true });
    }
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Failed to record progress" }, { status: 500 });
  }
}
