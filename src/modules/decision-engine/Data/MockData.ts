import type { ScoringResult } from "../types/decision.types";

export const MOCK_APPROVED: ScoringResult = {
  applicationId: "APP-2024-001",
  decision: "APPROVED",
  score: 850,
  maxAmount: 45000,
  currency: "RON",
  summary: "Client eligibil. Istoric de plată pozitiv și venituri stabile.",
  reasonCodes: [],
  createdAt: new Date().toISOString(),
};

export const MOCK_REJECTED: ScoringResult = {
  applicationId: "APP-2024-002",
  decision: "REJECTED",
  score: 420,
  currency: "RON",
  summary: "Scor insuficient. Gradul de îndatorare depășește limita admisă.",
  reasonCodes: [
    "R01 - Grad de îndatorare > 40%",
    "R05 - Istoric negativ în Biroul de Credit"
  ],
  createdAt: new Date().toISOString(),
};

export const MOCK_MANUAL: ScoringResult = {
  applicationId: "APP-2024-003",
  decision: "MANUAL_REVIEW",
  score: 680,
  currency: "RON",
  summary: "Necesită analiză umană. Documente de venit neclare.",
  reasonCodes: ["W02 - Discrepanță venit declarat vs ANAF"],
  createdAt: new Date().toISOString(),
};