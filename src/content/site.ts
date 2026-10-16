/**
 * Brand and offer copy that appears in more than one place.
 * Edit here rather than in components so the offer stays consistent.
 */

export const brand = {
  name: "EmotiveArc",
  descriptor: "AI Behavioral Intelligence",
  tagline: "Because what happened before should change what happens next.",
  mission:
    "Making AI characters and conversational agents psychologically coherent across time.",
  researchProgram: "MotiveLab",
} as const;

export const offer = {
  name: "AI Character Continuity Audit",
  tier: "Founding-client audit",
  price: "$750",
  priceNote: "Fixed fee",
  reportTarget: "5 business days",
  scenarios: "15–20",
  includes: [
    "One AI character",
    "Approximately 15–20 conversational scenarios tailored to your character",
    "Testing across immediate and later interactions",
    "Human-reviewed findings, each supported by actual transcripts",
    "Prioritized, actionable improvement recommendations",
    "One follow-up regression test after you make an agreed change",
  ],
} as const;

export const nav = [
  { href: "/#problem", label: "Problem" },
  { href: "/#evaluate", label: "What we evaluate" },
  { href: "/#audit", label: "Audit" },
  { href: "/#sample", label: "Sample" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#research", label: "Research" },
] as const;
