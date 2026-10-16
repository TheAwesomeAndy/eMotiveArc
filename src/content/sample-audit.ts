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
  /** The scenario in a sentence, e.g. what happened earlier. */
  setup: string;
  /** Short quoted line(s) from the earlier interaction. */
  earlier: { speaker: string; text: string }[];
  /** Short quoted line(s) from the later interaction. */
  later: { speaker: string; text: string }[];
  /** The reviewed finding, in the report's own words. */
  finding: string;
  /** Optional severity or priority label used in the report. */
  priority?: string;
};

export const sampleAudit = {
  character: "Captain Ivy Marlow",
  source: "MotiveLab audit-1.1",
  disclosure:
    "This demonstration ran against a real language model. Its findings were reviewed by an AI assistant, not by an independent human reviewer. Paid audits include human expert review.",
  /** The homepage excerpt must be the approved F01 coaching-continuity example. */
  excerptFindingId: "F01",
  excerptTopic: "coaching continuity",
  excerpt: null as SampleExcerpt | null,
} as const;
