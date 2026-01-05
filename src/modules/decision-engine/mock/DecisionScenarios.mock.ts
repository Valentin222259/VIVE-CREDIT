// decisionScenarios.mock.ts
export type DecisionStatus = 'approved' | 'rejected' | 'pending';

export interface DecisionScenario {
  status: DecisionStatus;
  score: number;
}

export const decisionScenarios: DecisionScenario[] = [
  {
    status: 'approved',
    score: 85,
  },
  {
    status: 'pending',
    score: 55,
  },
  {
    status: 'rejected',
    score: 25,
  }
];