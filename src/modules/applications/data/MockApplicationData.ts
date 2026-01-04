// 1. Profilul Utilizatorului (se va lua de la calculator scoring)
export const MOCK_USER_PROFILE = {
  id: "USER-101",
  firstName: "Andrei",
  lastName: "Popescu",
  email: "popescu_an@gmai.com",
  cnp: "1960520123456",
  phoneNumber: "07xx12x4xx",
  address: "Strada Lalelelor, Nr. 1, București",
  monthlyIncome: 7500,        
  employmentStatus: "EMPLOYED_INDEFINITE", 
  existingDebts: 0            
};

// 2. Setările Băncii 
export const LOAN_CONFIG = {
  minAmount: 500,
  maxAmount: 50000,
  minPeriod: 6,
  maxPeriod: 60,
  interestRate: 14.5, // fix
  defaultAmount: 5000,
  defaultPeriod: 24
};

// 3. Structura datelor pentru Decision Engine
export interface DecisionEnginePayload {
  id: string;
  source: 'ONLINE_APPLICATION';
  status: 'PENDING';
  submissionDate: string;
  applicant: typeof MOCK_USER_PROFILE;
  loanDetails: {
    amount: number;
    period: number;
    monthlyInstallment: number;
    interestRate: number;
    purpose: string;
  };
}