import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey || apiKey === "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx") {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const appLanguage = formData.get("appLanguage") as string || "english";

    // Prepare form data for OpenAI API
    const whisperFormData = new FormData();
    whisperFormData.append("file", file);
    whisperFormData.append("model", "whisper-1");
    // Explicitly set language to English for both to avoid hallucination in non-English modes
    whisperFormData.append("language", "en");

    // Only apply the Pidgin specific linguistic constraint if the app is in pidgin mode
    if (appLanguage === "pidgin") {
      whisperFormData.append("prompt", "Hello! Abeg, omo, dey, wetin, sabi, una, e, no, go, do, na, make, am, dem, sha, nah, oo, wey, wetin dey happen.");
    } else {
      // Standard English transcription prompt to guide accurate spelling and punctuation
      whisperFormData.append("prompt", "Hello, how are you today? Let's start learning.");
    }

    // Call OpenAI Whisper
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI Whisper Error:", errorData);
      return NextResponse.json({ error: "Failed to transcribe audio" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Transcription Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
