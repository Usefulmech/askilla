import { AskillaCourseModule, LearningLanguage } from "@/lib/types/askilla";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import { getSubjectAlignedTopics } from "./topic-recommender";

async function fetchTavilySearch(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY?.trim();
  if (!apiKey || apiKey === "YOUR_TAVILY_API_KEY") {
    console.warn("Tavily API Key missing, skipping web search.");
    return "No search results available.";
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        max_results: 3,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.results) {
        return data.results
          .map((r: any) => `Title: ${r.title}\nContent: ${r.content}\nSource: ${r.url}`)
          .join("\n\n");
      }
    }
  } catch (err) {
    console.error("Tavily search failed:", err);
  }

  return "No search results available.";
}

export async function generateAskillaModule(
  topic: string,
  language: LearningLanguage,
  level: string = "beginner"
): Promise<AskillaCourseModule> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  // 1. Fetch web search context via Tavily API
  console.log(`Running Tavily RAG search for topic: "${topic}"...`);
  const searchContext = await fetchTavilySearch(topic);

  // 2. Query GPT-4o with search context
  if (apiKey && apiKey !== "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: buildSystemPrompt(language) },
            { role: "user", content: buildUserPrompt(topic, language, level, searchContext) },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);
        const related = content.related_topics && content.related_topics.length > 0
          ? content.related_topics
          : getSubjectAlignedTopics(topic);

        return {
          id: `mod_${Date.now()}`,
          topic: content.topic || topic,
          concise_topic: content.concise_topic || content.topic || topic,
          language: (content.language?.toLowerCase() as LearningLanguage) || language,
          modules: content.modules || [],
          related_topics: related,
        };
      }
    } catch (err) {
      console.warn("OpenAI API call failed, using intelligent native fallback module generator:", err);
    }
  }

  // Robust Native Language Fallback Generator
  return getNativeFallbackModule(topic, language);
}

function getNativeFallbackModule(
  topic: string,
  language: LearningLanguage
): AskillaCourseModule {
  const normalizedTopic = topic
    .replace(/^(i\s+want\s+to\s+learn\s+about\s+|i\s+want\s+to\s+learn\s+|teach\s+me\s+about\s+|teach\s+me\s+|learn\s+about\s+|learn\s+|how\s+to\s+do\s+|how\s+to\s+|how\s+can\s+i\s+learn\s+)/i, "")
    .trim()
    .replace(/^./, (str) => str.toUpperCase());

  // Pidgin Fallback (No emojis)
  if (language === "pidgin") {
    return {
      id: `mod_pidgin_${Date.now()}`,
      topic: normalizedTopic,
      concise_topic: normalizedTopic,
      language: "pidgin",
      related_topics: getSubjectAlignedTopics(normalizedTopic),
      modules: [
        {
          id: "m1",
          title: `Wetin Be ${normalizedTopic}?`,
          explanation: {
            local: `Welcome! Today Uncle Sabi wan break down **${normalizedTopic}** for you sharp sharp. No stress at all. Everyday for market, school, or work, we dey use these principles without even knowing. Once you master the **basic formula** and **concepts**, you go sabi am forever!`,
            english_terms: ["formula", "concepts", "fundamentals", "variables"],
            native_equivalents: {
              formula: "calculation guide",
              concepts: "core ideas",
            },
          },
          image_search: "african students learning data spreadsheet laptop",
          diagram: `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
            <rect width="400" height="120" rx="16" fill="#FAFAD5" stroke="#D4A574" stroke-width="2"/>
            <circle cx="60" cy="60" r="30" fill="#D4A574"/>
            <text x="60" y="66" font-family="sans-serif" font-size="20" fill="#2D2D2D" text-anchor="middle" font-weight="bold">1</text>
            <text x="110" y="55" font-family="sans-serif" font-size="16" fill="#2D2D2D" font-weight="bold">Input Data &amp; Understanding</text>
            <text x="110" y="78" font-family="sans-serif" font-size="13" fill="#666666">Understand the formula before solving</text>
          </svg>`,
          source: "— Source: 3MTT Curriculum & WAEC Standard Reference",
          audio_available: true,
          questions: [
            {
              id: "q1_1",
              question: `Wetin be the main reason why we dey use **${normalizedTopic}**?`,
              options: [
                "To solve problem sharp sharp and arrange our work",
                "To make life hard for students",
                "Because phone dey use am only",
                "None of the above",
              ],
              correct_answer: "To solve problem sharp sharp and arrange our work",
              wrong_feedback: "Hmm, you're close. Think about how tools help us work faster and smarter. Try again.",
              wrong_feedback_second_try: "No shaking at all. Uncle Sabi says: focus on how this tool organizes information for you. Select option A.",
              correct_feedback: "You sabi. That is exactly how smart professionals use it.",
              hint: "Focus on efficiency and problem solving.",
            },
          ],
        },
      ],
    };
  }

  // Default English Fallback (No emojis)
  return {
    id: `mod_english_${Date.now()}`,
    topic: normalizedTopic,
    concise_topic: normalizedTopic,
    language: "english",
    related_topics: getSubjectAlignedTopics(normalizedTopic),
    modules: [
      {
        id: "m1",
        title: `Introduction to ${normalizedTopic}`,
        explanation: {
          local: `Welcome! Uncle Sabi is here to break down **${normalizedTopic}** step-by-step. Mastering the core **formula** and **concepts** will help you solve exam questions and real-world practical challenges effortlessly.`,
          english_terms: ["formula", "concepts", "variables", "foundations"],
          native_equivalents: {
            formula: "calculation method",
            concepts: "core building blocks",
          },
        },
        image_search: "student taking notes studying tablet",
        diagram: `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
          <rect width="400" height="120" rx="16" fill="#FAFAD5" stroke="#D4A574" stroke-width="2"/>
          <text x="200" y="65" font-family="sans-serif" font-size="18" fill="#2D2D2D" font-weight="bold" text-anchor="middle">Understanding ${normalizedTopic}</text>
        </svg>`,
        source: "— Source: Khan Academy & Standard Educational Curriculum",
        audio_available: true,
        questions: [
          {
            id: "qe1_1",
            question: `What is the primary purpose of learning **${normalizedTopic}**?`,
            options: [
              "To solve problems efficiently and systematically",
              "To memorize rules without application",
              "Only for desktop computer users",
              "None of the above",
            ],
            correct_answer: "To solve problems efficiently and systematically",
            wrong_feedback: "You're close. Think about how tools and knowledge empower efficiency.",
            wrong_feedback_second_try: "Uncle Sabi tip: Option A is the correct and most effective approach.",
            correct_feedback: "Spot on. You are building real-world skills.",
            hint: "Focus on problem solving efficiency.",
          },
        ],
      },
    ],
  };
}
