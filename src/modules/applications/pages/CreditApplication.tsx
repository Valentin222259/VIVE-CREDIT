import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  MOCK_USER_PROFILE,
  LOAN_CONFIG,
  type DecisionEnginePayload,
} from "../data/MockApplicationData";

const CreditApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loanValues, setLoanValues] = useState({
    amount: LOAN_CONFIG.defaultAmount,
    period: LOAN_CONFIG.defaultPeriod,
  });

  const [simulation, setSimulation] = useState({
    monthlyRate: 0,
    totalRepay: 0,
  });

  useEffect(() => {
    const monthlyInterest = LOAN_CONFIG.interestRate / 100 / 12;
    const factor = Math.pow(1 + monthlyInterest, loanValues.period);
    const rate = (loanValues.amount * monthlyInterest * factor) / (factor - 1);

    setSimulation({
      monthlyRate: Math.round(rate),
      totalRepay: Math.round(rate * loanValues.period),
    });
  }, [loanValues]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanValues({
      ...loanValues,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const payload: DecisionEnginePayload = {
      id: `APP-${Date.now()}`,
      source: "ONLINE_APPLICATION",
      status: "PENDING",
      submissionDate: new Date().toISOString(),
      applicant: MOCK_USER_PROFILE,
      loanDetails: {
        amount: loanValues.amount,
        period: loanValues.period,
        monthlyInstallment: simulation.monthlyRate,
        interestRate: LOAN_CONFIG.interestRate,
        purpose: "Personal Needs",
      },
    };

    console.log("📨 [TASK 2.3] Payload:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Cerere trimisă cu succes! ID: ${payload.id}`);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen transition-colors duration-300">
      {/* Header-ul paginii */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Solicită Credit
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Configurează suma și perioada dorită.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COL 1: CALCULATOR */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Calculator Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-10 pt-4">
              {/* Slider Suma */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-slate-700 dark:text-slate-300">
                    Suma Dorită
                  </label>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                    {loanValues.amount.toLocaleString()} RON
                  </span>
                </div>
                <input
                  type="range"
                  name="amount"
                  min={LOAN_CONFIG.minAmount}
                  max={LOAN_CONFIG.maxAmount}
                  step="100"
                  value={loanValues.amount}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{LOAN_CONFIG.minAmount} RON</span>
                  <span>{LOAN_CONFIG.maxAmount} RON</span>
                </div>
              </div>

              {/* Slider Perioada */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-slate-700 dark:text-slate-300">
                    Perioada
                  </label>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                    {loanValues.period} Luni
                  </span>
                </div>
                <input
                  type="range"
                  name="period"
                  min={LOAN_CONFIG.minPeriod}
                  max={LOAN_CONFIG.maxPeriod}
                  step="1"
                  value={loanValues.period}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{LOAN_CONFIG.minPeriod} luni</span>
                  <span>{LOAN_CONFIG.maxPeriod} luni</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATE APLICANT */}
          <Card className="bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700">
            <CardContent className="pt-6">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Profil Aplicant (Preluat din cont)
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200 dark:shadow-none">
                  {MOCK_USER_PROFILE.firstName[0]}
                  {MOCK_USER_PROFILE.lastName[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">
                    {MOCK_USER_PROFILE.firstName} {MOCK_USER_PROFILE.lastName}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    CNP: {MOCK_USER_PROFILE.cnp} • Venit:{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {MOCK_USER_PROFILE.monthlyIncome} RON
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:relative">
          <Card className="bg-slate-900 dark:bg-slate-950 text-white border-0 shadow-2xl sticky top-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <CardHeader className="relative">
              <CardTitle className="text-slate-300 text-sm font-medium uppercase tracking-widest">
                Rezumat Ofertă
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative">
              <div>
                <p className="text-slate-400 text-xs mb-1 uppercase">
                  Rata Lunară
                </p>
                <div className="text-5xl font-extrabold text-white tracking-tight">
                  {simulation.monthlyRate.toLocaleString()}{" "}
                  <span className="text-lg font-light text-slate-400">RON</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-800 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total de plată</span>
                  <span className="font-medium">
                    {simulation.totalRepay.toLocaleString()} RON
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Dobândă (DAE)</span>
                  <span className="text-yellow-400 font-bold">
                    {LOAN_CONFIG.interestRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Comision Analiză</span>
                  <span className="text-emerald-400">GRATUIT</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white h-14 text-lg font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Procesare...
                  </div>
                ) : (
                  "Trimite Cererea"
                )}
              </Button>

              <p className="text-[10px] text-center text-slate-500 leading-tight">
                * Calculul este informativ și poate varia în urma analizei
                Decision Engine.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditApplication;
