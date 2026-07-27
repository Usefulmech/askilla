import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const { chatHistory, topic, language } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (!apiKey || apiKey === "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx") {
      const fallbackReply =
        language === "pidgin"
          ? "Uncle Sabi dey online, but OpenAI key no dey configured. Check your env setup."
          : "Uncle Sabi is online, but the OpenAI API key is not configured. Please check your env setup.";
      return NextResponse.json({ reply: fallbackReply });
    }

    // Format chat history for OpenAI completions api
    const formattedMessages = [
      {
        role: "system",
        content: `You are Uncle Sabi, the patient, encouraging Nigerian AI tutor teaching "${topic}" in ${language.toUpperCase()}. 
Core Principles:
1. Target complete beginners. Keep explanations comprehensive, detailed, and highly clear.
2. STRICTLY do not use emojis or emoticons under any circumstances.
3. Keep the user on track. If they ask off-topic questions, answer briefly and guide them back to the active course topic.
4. Tone: warm, encouraging, patient, mature.`,
      },
      ...chatHistory.slice(-10).map((m: any) => ({
        role: m.sender === "uncle_sabi" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: formattedMessages,
        temperature: 0.7,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0].message.content;
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json(
        { error: "OpenAI completed request with failure code" },
        { status: response.status }
      );
    }
  } catch (err) {
    console.error("Error in conversational /api/chat tutor:", err);
    return NextResponse.json(
      { error: "Internal server compilation error in chat route" },
      { status: 500 }
    );
  }
}
