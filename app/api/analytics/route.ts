import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "user_guest";

    // 1. Fetch completed modules count
    const completedCount = await prisma.userProgress.count({
      where: {
        userId,
        completed: true,
      },
    });

    // 2. Fetch all question attempts for correctness metrics
    const attempts = await prisma.questionAttempt.findMany({
      where: {
        userId,
      },
    });

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter((a) => a.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    // 3. Language breakdown
    const pidginAttempts = attempts.filter((a) => a.language.toLowerCase() === "pidgin").length;
    const englishAttempts = totalAttempts - pidginAttempts;

    const pidginRatio = totalAttempts > 0 ? Math.round((pidginAttempts / totalAttempts) * 100) : 50;
    const englishRatio = totalAttempts > 0 ? Math.round((englishAttempts / totalAttempts) * 100) : 50;

    // 4. Calculate average attempts per question
    // Map unique question keys: module_questionIndex
    const uniqueQuestionsMap: Record<string, number> = {};
    attempts.forEach((a) => {
      const key = `${a.moduleId}_${a.questionIndex}`;
      uniqueQuestionsMap[key] = (uniqueQuestionsMap[key] || 0) + 1;
    });

    const uniqueQuestionsCount = Object.keys(uniqueQuestionsMap).length;
    const avgAttemptsPerQuestion =
      uniqueQuestionsCount > 0 ? (totalAttempts / uniqueQuestionsCount).toFixed(1) : "0.0";

    // 5. Mock speed / velocity representation based on real timestamps
    // Average difference in seconds between consecutive attempts in the same session
    let avgSpeedSeconds = 120; // Default fallback: 2 minutes
    if (totalAttempts > 1) {
      const sortedAttempts = [...attempts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      let diffSum = 0;
      let diffCount = 0;
      for (let i = 1; i < sortedAttempts.length; i++) {
        const diff = (sortedAttempts[i].createdAt.getTime() - sortedAttempts[i - 1].createdAt.getTime()) / 1000;
        // Limit to same-session differences (under 10 minutes) to avoid cross-session distortions
        if (diff < 600) {
          diffSum += diff;
          diffCount++;
        }
      }
      if (diffCount > 0) {
        avgSpeedSeconds = Math.round(diffSum / diffCount);
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        completedModules: completedCount,
        totalAttempts,
        accuracyRate,
        languageBreakdown: {
          pidgin: pidginRatio,
          english: englishRatio,
        },
        avgAttemptsPerQuestion,
        learningSpeedSeconds: avgSpeedSeconds,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to load analytics metrics" }, { status: 500 });
  }
}
