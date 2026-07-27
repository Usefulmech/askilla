import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export interface TrendingItem {
  id: string;
  topic: string;
  domain: "highschool" | "university" | "career";
  domainLabel: string;
  learnerCount: string;
  tag: string;
  description: string;
}

const CURATED_TRENDING: TrendingItem[] = [
  // High School & Exams (WAEC / JAMB)
  {
    id: "tr_1",
    topic: "WAEC Mathematics Algebra",
    domain: "highschool",
    domainLabel: "WAEC / JAMB Prep",
    learnerCount: "Verified WAEC Track",
    tag: "High Yield Exam Track",
    description: "Master quadratic equations, indices, and logarithms with step-by-step WAEC formulas.",
  },
  {
    id: "tr_2",
    topic: "JAMB English Synonyms & Antonyms",
    domain: "highschool",
    domainLabel: "WAEC / JAMB Prep",
    learnerCount: "Verified JAMB Track",
    tag: "Exam Core",
    description: "Core vocabulary rules, register, and comprehension passage techniques.",
  },
  {
    id: "tr_3",
    topic: "WAEC Physics Motion & Waves",
    domain: "highschool",
    domainLabel: "WAEC / JAMB Prep",
    learnerCount: "Verified Physics Track",
    tag: "Core Science",
    description: "Kinematics, wave equations, and refraction calculations explained simply.",
  },

  // University & STEM
  {
    id: "tr_4",
    topic: "Entropy & Thermodynamics",
    domain: "university",
    domainLabel: "University & STEM",
    learnerCount: "Verified STEM Track",
    tag: "Engineering & Science",
    description: "Second Law of Thermodynamics, enthalpy, Gibbs free energy, and microstates.",
  },
  {
    id: "tr_5",
    topic: "Calculus Derivatives & Integrals",
    domain: "university",
    domainLabel: "University & STEM",
    learnerCount: "Verified Math Track",
    tag: "Higher Mathematics",
    description: "Limits, chain rule, integration techniques, and real-world rates of change.",
  },
  {
    id: "tr_6",
    topic: "Organic Chemistry Reactions",
    domain: "university",
    domainLabel: "University & STEM",
    learnerCount: "Verified Chemistry Track",
    tag: "Pre-Med & Science",
    description: "Functional groups, reaction mechanisms, and molecular structure principles.",
  },

  // Career & Digital Skills
  {
    id: "tr_7",
    topic: "Excel VLOOKUP & Data Analysis",
    domain: "career",
    domainLabel: "Career & Digital Skills",
    learnerCount: "Verified Workforce Track",
    tag: "Workforce Essential",
    description: "Master XLOOKUP, Pivot Tables, SUMIFS, and corporate data reporting.",
  },
  {
    id: "tr_8",
    topic: "Python Programming Fundamentals",
    domain: "career",
    domainLabel: "Career & Digital Skills",
    learnerCount: "Verified Tech Track",
    tag: "Tech Track",
    description: "Variables, loops, functions, and introductory data science with Python.",
  },
  {
    id: "tr_9",
    topic: "Professional Email & Business Writing",
    domain: "career",
    domainLabel: "Career & Digital Skills",
    learnerCount: "Verified Business Track",
    tag: "Professional Skills",
    description: "Structure persuasive emails, proposal drafts, and executive summaries.",
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domainFilter = searchParams.get("domain");

    let dbTopics: TrendingItem[] = [];

    // Query real PostgreSQL database metrics
    try {
      const topModules = await prisma.module.groupBy({
        by: ["topic"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 6,
      });

      if (topModules && topModules.length > 0) {
        dbTopics = topModules.map((item, idx) => ({
          id: `db_tr_${idx}`,
          topic: item.topic,
          domain: "career",
          domainLabel: "Popular Study Track",
          learnerCount: `${item._count.id} Active Learner${item._count.id === 1 ? "" : "s"}`,
          tag: "Active Learning",
          description: `Interactive micro-lessons and step-by-step practice for ${item.topic}.`,
        }));
      }
    } catch (err) {
      console.warn("PostgreSQL DB lookup skipped for trending API:", err);
    }

    const combined = [...dbTopics, ...CURATED_TRENDING];

    // Filter by domain if specified
    const filtered = domainFilter && domainFilter !== "all"
      ? combined.filter((item) => item.domain === domainFilter)
      : combined;

    return NextResponse.json({ trending: filtered });
  } catch (error) {
    console.error("Error in /api/trending:", error);
    return NextResponse.json({ trending: CURATED_TRENDING });
  }
}
