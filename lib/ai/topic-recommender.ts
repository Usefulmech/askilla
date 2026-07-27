export function getSubjectAlignedTopics(topic: string): string[] {
  const t = topic.toLowerCase().trim();

  // Thermodynamics / Physics
  if (t.includes("entropy") || t.includes("thermo") || t.includes("heat") || t.includes("energy")) {
    return [
      "Enthalpy & Free Energy (Delta G)",
      "Second Law of Thermodynamics",
      "Statistical Thermodynamics",
      "Information Entropy & Microstates",
    ];
  }

  // Physics / Science
  if (t.includes("physics") || t.includes("mechanics") || t.includes("motion") || t.includes("wave") || t.includes("force")) {
    return [
      "Newtonian Kinematics & Gravity",
      "Work, Energy & Power",
      "Electromagnetism & Waves",
      "Nuclear Physics & Radioactivity",
    ];
  }

  // Chemistry
  if (t.includes("chem") || t.includes("mole") || t.includes("atom") || t.includes("reaction") || t.includes("acid")) {
    return [
      "Stoichiometry & Mole Concept",
      "Chemical Equilibrium & Le Chatelier",
      "Electrochemistry & Redox Reactions",
      "Organic Chemistry Functional Groups",
    ];
  }

  // Mathematics / Algebra / Calculus
  if (t.includes("math") || t.includes("algebra") || t.includes("calculus") || t.includes("fraction") || t.includes("equation") || t.includes("waec math") || t.includes("jamb")) {
    return [
      "Quadratic & Linear Equations",
      "Calculus: Derivatives & Integrals",
      "Trigonometry & Pythagoras Theorem",
      "Statistics & Probability Calculations",
    ];
  }

  // Excel / Spreadsheets / Data Analysis
  if (t.includes("excel") || t.includes("sheet") || t.includes("spreadsheet") || t.includes("data") || t.includes("vlookup") || t.includes("pivot")) {
    return [
      "VLOOKUP & XLOOKUP Masterclass",
      "Pivot Tables & Dynamic Slicers",
      "Excel Formulas (IF, COUNTIF, SUMIFS)",
      "Data Visualization & Dashboards",
    ];
  }

  // Programming / Web Dev / Coding / Machine Learning / AI
  if (t.includes("code") || t.includes("python") || t.includes("javascript") || t.includes("ai") || t.includes("machine learning") || t.includes("web") || t.includes("html")) {
    return [
      "Python Data Structures & Loops",
      "Machine Learning Model Building",
      "JavaScript DOM Manipulation",
      "REST APIs & Web Backend",
    ];
  }

  // Accounting / Business / Finance
  if (t.includes("account") || t.includes("finance") || t.includes("business") || t.includes("money") || t.includes("profit") || t.includes("tax")) {
    return [
      "Double-Entry Bookkeeping Rules",
      "Balance Sheet & Income Statements",
      "Cash Flow & Budgeting Techniques",
      "Financial Analysis & Ratio Calculations",
    ];
  }

  // English / Communication / Writing
  if (t.includes("english") || t.includes("grammar") || t.includes("writing") || t.includes("jamb english") || t.includes("essay")) {
    return [
      "Subject-Verb Agreement Rules",
      "JAMB Synonyms & Antonyms",
      "Professional Essay & Email Writing",
      "Comprehension & Summary Passages",
    ];
  }

  // Dynamic Subject Fallback
  const clean = topic.replace(/^(i\s+want\s+to\s+learn\s+about\s+|i\s+want\s+to\s+learn\s+|teach\s+me\s+about\s+|teach\s+me\s+)/i, "").trim();
  return [
    `${clean} - Advanced Applications`,
    `Step-by-Step ${clean} Calculations`,
    `Real-World ${clean} Practice Problems`,
    `WAEC & Professional ${clean} Exam Prep`,
  ];
}
