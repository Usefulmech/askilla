import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      phone,
      moduleId,
      moduleIndex,
      questionIndex,
      userAnswer,
      isCorrect,
      completed,
      feedbackGiven,
      language,
      idempotencyKey,
    } = body;

    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { phone },
      });

      if (!user) {
        return NextResponse.json({ error: "User must be created before recording progress" }, { status: 404 });
      }

      const module = await prisma.module.findUnique({
        where: { id: moduleId },
      });

      if (!module) {
        return NextResponse.json({ error: "Module was not found in the course database" }, { status: 404 });
      }

      const safeModuleIndex = Number.isFinite(Number(moduleIndex)) ? Number(moduleIndex) : 0;
      const safeQuestionIndex = Number.isFinite(Number(questionIndex)) ? Number(questionIndex) : 0;
      const normalizedAnswer = userAnswer || "";

      const existingAttempt = await prisma.questionAttempt.findFirst({
        where: {
          userId: user.id,
          moduleId,
          questionIndex: safeQuestionIndex,
          userAnswer: normalizedAnswer,
        },
      });

      const attempt = existingAttempt || await prisma.questionAttempt.create({
          data: {
            userId: user.id,
            moduleId,
            questionIndex: safeQuestionIndex,
            userAnswer: normalizedAnswer,
            isCorrect: Boolean(isCorrect),
            feedbackGiven: feedbackGiven || "",
            language: language || "english",
          },
        });

      const existingProgress = await prisma.userProgress.findFirst({
        where: {
          userId: user.id,
          moduleId,
        },
      });

      const nextCompletedCount = Math.max(
        existingProgress?.currentQuestion || 0,
        Boolean(completed) ? safeModuleIndex + 1 : safeModuleIndex
      );

      const progressData = {
        currentQuestion: nextCompletedCount,
        correctAnswers: (existingProgress?.correctAnswers || 0) + (Boolean(isCorrect) && !existingAttempt ? 1 : 0),
        wrongAttempts: (existingProgress?.wrongAttempts || 0) + (!Boolean(isCorrect) && !existingAttempt ? 1 : 0),
        completed: Boolean(completed) || existingProgress?.completed || false,
        completedAt: Boolean(completed) ? new Date() : existingProgress?.completedAt || null,
      };

      const progress = existingProgress
        ? await prisma.userProgress.update({
            where: { id: existingProgress.id },
            data: progressData,
          })
        : await prisma.userProgress.create({
            data: {
              userId: user.id,
              moduleId,
              ...progressData,
            },
          });

      return NextResponse.json({
        success: true,
        attempt,
        progress,
        existing: Boolean(existingAttempt),
        userId: user.id,
        idempotencyKey,
      });
    } catch (dbErr) {
      console.warn("PostgreSQL progress save failed:", dbErr);
      return NextResponse.json({ error: "Failed to record progress" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Failed to record progress" }, { status: 500 });
  }
}
