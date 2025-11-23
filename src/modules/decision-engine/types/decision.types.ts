export type DecisionStatus = 'APPROVED' | 'REJECTED' | 'MANUAL_REVIEW';

export interface ScoringResult {
  applicationId: string;
  decision: DecisionStatus;
  score: number;           // 0 - 1000
  maxAmount?: number;      // Suma maximă (doar dacă e aprobat)
  currency: string;
  summary: string;         // Ex: "Scor bun, venit stabil"
  reasonCodes: string[];   // Ex: ["R01 - Grad îndatorare mare"]
  createdAt: string;
}