/**
 * Canonical client-data retention wording. Used on /data-handling and in the
 * FAQ, and mirrored in WEBSITE_HANDOFF.md for the prospect sheet, so every
 * channel says the same thing.
 *
 * Status: PENDING FOUNDER AND LEGAL APPROVAL. Don't strengthen this into a
 * guarantee until a documented deletion procedure and client contract terms
 * exist and have been approved.
 */
export const retention = {
  approvalStatus: "Pending founder and legal approval",
  headline: "Proposed default retention: 90 days",
  statement:
    "Our proposed default is to keep client audit materials for 90 days after we deliver the final report or regression retest, unless your written agreement sets a different period.",
  limits:
    "This default hasn't been finalized. Deletion is not automated, and we don't yet have a documented deletion procedure or issue deletion confirmations. The retention period and how deletion is handled will be set out in each client's written agreement before any materials are shared.",
  short:
    "Our proposed default is 90 days after the final report or retest, confirmed in each client's written agreement. Deletion isn't automated.",
} as const;
