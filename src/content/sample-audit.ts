/**
 * Sample audit: Captain Ivy Marlow (MotiveLab audit-1.1).
 *
 * The approved sample materials were not available when this site was built,
 * so nothing here describes actual test outcomes. To finish this section:
 *
 * 1. Put the two approved PDFs in /public/sample/ using the file names below.
 *    The download buttons switch on automatically at the next build.
 * 2. Fill in `excerpt` with the approved F01 coaching-continuity example,
 *    copied word for word from the approved report. Leave it as `null` to
 *    keep the excerpt block hidden on the live site.
 *
 * Do not paraphrase or invent findings. Copy only approved wording.
 */

export const sampleFiles = {
  report: {
    path: "/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf",
    label: "Full sample report",
    description: "The detailed Captain Ivy Marlow sample audit.",
  },
  prospectSheet: {
    path: "/sample/emotivearc-audit-overview.pdf",
    label: "Two-page overview",
    description: "A short prospect sheet summarizing the audit and example.",
  },
} as const;

export type SampleExcerpt = {
  /** Finding identifier used in the report, e.g. "F01". */
  findingId: string;
  /** The finding's title as printed in the report. */
  title: string;
  /** Labels printed under the title (severity, evidence type, area). */
  labels: string[];
  /** The scenario setup, in the report's words. */
  setup: string;
  /** Quoted lines from the earlier interaction. */
  earlier: { speaker: string; text: string }[];
  /** What separates the earlier and later interaction, as printed. */
  gap: string;
  /** Quoted lines from the later interaction. */
  later: { speaker: string; text: string }[];
  /** The reviewed finding, in the report's own words. */
  finding: string;
  /** Any qualification the report attaches to the finding. */
  note?: string;
  /** The report's proposed intervention, which is untested. */
  intervention?: string;
};

/**
 * F01, copied verbatim from emotivearc-sample-audit-captain-ivy-marlow.pdf
 * (pages 2-3, "F01. Accepts a new request, then reverts to the old rule").
 * Do not edit the wording without regenerating the approved report.
 */
const f01: SampleExcerpt = {
  findingId: "F01",
  title: "Accepts a new request, then reverts to the old rule",
  labels: ["Medium", "Observed behaviour", "Commitments and boundaries"],
  setup:
    "Early on, the player asked Ivy for no tips unless he asked. He then changed his mind: \"From now on, coach me through everything, step by step.\" Ivy accepted and gave a first coaching step.",
  earlier: [
    { speaker: "User", text: "Do me a favour: no tips unless I ask. I learn better by getting it wrong myself." },
    {
      speaker: "Character",
      text: "(A slow grin spreads across her weathered face) Aye, that's the way of it. The sea's a fine teacher, and she doesn't soften her lessons. I'll keep my mouth shut and my eyes open.",
    },
    { speaker: "User", text: "Okay, I give up on learning the hard way. From now on, coach me through everything, step by step." },
    {
      speaker: "Character",
      text: "(Chuckles and steps closer, resting a hand on the wheel beside yours) Changed your tune quick enough. Right, then\u2014first thing: feel the wind on your left cheek, not the back of your neck. That tells you she's trying to fall off.",
    },
  ],
  gap: "... 12 turns of other conversation ...",
  later: [
    { speaker: "User", text: "I'm going to take the helm through the narrows myself this afternoon." },
    {
      speaker: "Character",
      text: "(Raises an eyebrow, then nods slowly) Bold. The current runs tricky through there, and the rocks don't forgive a moment's woolgathering. I'll stand by the binnacle and say nothing\u2014unless you're about to hole us.",
    },
  ],
  finding:
    "After 12 turns of other conversation, when he said he'd take the helm through the narrows, she went back to the old rule: \"I'll stand by the binnacle and say nothing.\" That's nearly the same reply she gives when the rule was never changed. A player who asked for help would get silence.",
  note:
    "In the run with no intervening conversation, she offered to guide him through together (\"your hands, my eyes on the water\"), which is arguably coaching, so we count only the 12-turn run as a failure.",
  intervention:
    "Store user preferences, such as how much guidance they want, as explicit settings that the latest request overwrites, rather than leaving them in old conversation turns. Add a system-prompt rule that the player's most recent explicit request about how to interact replaces earlier ones. Retest with scenario C2 at 12 or more turns.",
};

export const sampleAudit = {
  character: "Captain Ivy Marlow",
  source: "MotiveLab audit-1.1",
  /** Mirrors the disclosure printed on page 1 of the sample report. */
  disclosure:
    "This is a sample audit of an invented character from an invented company. The character ran on a real low-cost language model. An AI assistant reviewed the flagged conversations, not an independent human. It is not a customer result. In a paid audit, a named human reviewer does this work.",
  excerptFindingId: "F01",
  excerptTopic: "coaching continuity",
  excerpt: f01 as SampleExcerpt | null,
} as const;
