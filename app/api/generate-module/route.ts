import { NextResponse } from "next/server";
import { generateAskillaModule } from "@/lib/ai/module-generator";
import { prisma } from "@/lib/db/prisma";
import { LearningLanguage } from "@/lib/types/askilla";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic as string;
    const language = (body.language as LearningLanguage) || "english";
    const level = (body.level as string) || "beginner";

    if (!topic || topic.trim() === "") {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const cleanTopic = topic.trim();

    // Check PostgreSQL database cache first
    try {
      const existingModule = await prisma.module.findFirst({
        where: {
          topic: { equals: cleanTopic, mode: "insensitive" },
          language: language,
        },
      });

      if (existingModule && existingModule.content) {
        return NextResponse.json({
          module: existingModule.content,
          cached: true,
        });
      }
    } catch (dbErr) {
      console.warn("PostgreSQL DB lookup skipped or connecting:", dbErr);
    }

    // Generate via AI / Native Fallback Engine
    const moduleContent = await generateAskillaModule(cleanTopic, language, level);

    // Persist to PostgreSQL Neon database asynchronously & log to ML dataset
    try {
      await prisma.module.create({
        data: {
          topic: cleanTopic,
          language: language,
          difficulty: "beginner",
          content: JSON.parse(JSON.stringify(moduleContent)),
        },
      });
    } catch (saveErr) {
      console.warn("PostgreSQL DB save skipped:", saveErr);
    }

    // Log to dataset for AI model training
    try {
      fetch(`${new URL(req.url).origin}/api/log-dataset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "module_generated",
          topic: cleanTopic,
          language,
          level,
          explanation: moduleContent.modules?.[0]?.explanation?.local || "",
          metadata: { module_count: moduleContent.modules?.length || 0 },
        }),
      }).catch((e) => console.warn("Dataset log error:", e));
    } catch (e) {
      // Non-blocking
    }

    return NextResponse.json({
      module: moduleContent,
      cached: false,
    });
  } catch (error) {
    console.error("Error in /api/generate-module:", error);
    return NextResponse.json(
      { error: "Failed to generate module" },
      { status: 500 }
    );
  }
}
