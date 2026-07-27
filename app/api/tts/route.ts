import { NextResponse } from "next/server";

// Phonetically transforms written Pidgin into stress-accented text for OpenAI Neural TTS to speak with authentic Nigerian cadence
function phoneticPidginCadence(text: string): string {
  return text
    .replace(/\bWetin\b/gi, "Weh-tihn")
    .replace(/\bSabi\b/gi, "Sah-bee")
    .replace(/\bUncle Sabi\b/gi, "Uncle Sah-bee")
    .replace(/\babeg\b/gi, "ah-beg,")
    .replace(/\bpikin\b/gi, "pee-kihn")
    .replace(/\bdey\b/gi, "deh")
    .replace(/\bOya\b/gi, "Oh-yah,")
    .replace(/\bNaija\b/gi, "Nine-jah")
    .replace(/\bwell well\b/gi, "well-well")
    .replace(/\bno stress\b/gi, "no stress,")
    .replace(/\bsee ehn\b/gi, "see ehn,")
    .replace(/\bmake I\b/gi, "make I,")
    .replace(/\bna so\b/gi, "na so,")
    .replace(/\bwahala\b/gi, "wah-hah-lah")
    .replace(/\byou sabi\b/gi, "you sah-bee");
}

export async function POST(req: Request) {
  try {
    const { text, voice = "onyx" } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey !== "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx") {
      try {
        // Pre-process text with authentic Pidgin cadence pauses and phonetics
        const cadenceText = phoneticPidginCadence(text.slice(0, 4096));

        const response = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "tts-1-hd", // High-definition neural audio capturing natural African pitch & warmth
            input: cadenceText,
            voice: voice, // 'onyx' or 'echo' delivers a warm, authoritative Nigerian tutor tone
            speed: 0.94,
          }),
        });

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      } catch (apiErr) {
        console.warn("OpenAI Neural TTS call failed, client fallback will handle:", apiErr);
      }
    }

    return NextResponse.json({ fallback: true }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/tts:", error);
    return NextResponse.json({ error: "TTS generation failed" }, { status: 500 });
  }
}
