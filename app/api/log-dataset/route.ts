import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const JSONL_FILE = path.join(DATA_DIR, "askilla_ml_dataset.jsonl");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Ignore filesystem errors in serverless production environments
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const recordData = {
      eventType: body.event_type || "interaction",
      topic: body.topic || "General",
      language: body.language || "english",
      level: body.level || "beginner",
      prompt: body.prompt || "",
      explanation: body.explanation || "",
      userAnswer: body.user_answer || "",
      isCorrect: body.is_correct ?? null,
      feedback: body.feedback || "",
      metadata: body.metadata || {},
    };

    // 1. Primary: Save to Neon PostgreSQL DB (Production Persistent)
    let dbRecordId = "";
    try {
      const dbRes = await (prisma as any).datasetLog.create({
        data: recordData,
      });
      dbRecordId = dbRes.id;
    } catch (dbErr) {
      console.warn("PostgreSQL dataset log skipped:", dbErr);
    }

    // 2. Secondary: Append to local JSONL (Local Development Backup)
    try {
      ensureDataDir();
      const fileRecord = {
        id: dbRecordId || `ml_rec_${Date.now()}`,
        timestamp: new Date().toISOString(),
        event_type: recordData.eventType,
        topic: recordData.topic,
        language: recordData.language,
        level: recordData.level,
        prompt: recordData.prompt,
        explanation: recordData.explanation,
        user_answer: recordData.userAnswer,
        is_correct: recordData.isCorrect,
        feedback: recordData.feedback,
        metadata: recordData.metadata,
      };
      fs.appendFileSync(JSONL_FILE, JSON.stringify(fileRecord) + "\n", "utf-8");
    } catch (fsErr) {
      // Local FS write skipped in serverless env
    }

    return NextResponse.json({ success: true, record_id: dbRecordId || `ml_rec_${Date.now()}` });
  } catch (error) {
    console.error("Dataset logging error:", error);
    return NextResponse.json({ error: "Failed to log dataset" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 1. Primary: Fetch from Neon PostgreSQL DB
    try {
      const dbLogs = await (prisma as any).datasetLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });

      if (dbLogs && dbLogs.length > 0) {
        const records = dbLogs.map((l: any) => ({
          id: l.id,
          timestamp: l.timestamp || l.createdAt,
          event_type: l.eventType,
          topic: l.topic,
          language: l.language,
          level: l.level,
          prompt: l.prompt || "",
          explanation: l.explanation || "",
          user_answer: l.userAnswer || "",
          is_correct: l.isCorrect,
          feedback: l.feedback || "",
          metadata: l.metadata || {},
        }));
        return NextResponse.json({ records, total: records.length, source: "PostgreSQL Production DB" });
      }
    } catch (dbErr) {
      console.warn("PostgreSQL dataset read skipped, trying local file fallback:", dbErr);
    }

    // 2. Secondary Fallback: Read from local JSONL
    ensureDataDir();
    if (!fs.existsSync(JSONL_FILE)) {
      return NextResponse.json({ records: [], total: 0, source: "Empty" });
    }

    const fileContent = fs.readFileSync(JSONL_FILE, "utf-8");
    const lines = fileContent.split("\n").filter((l) => l.trim() !== "");
    const records = lines.map((l) => JSON.parse(l));

    return NextResponse.json({ records, total: records.length, source: "Local JSONL File" });
  } catch (error) {
    console.error("Dataset read error:", error);
    return NextResponse.json({ error: "Failed to fetch dataset" }, { status: 500 });
  }
}
