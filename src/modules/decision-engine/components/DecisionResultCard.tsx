import React, { useState, useEffect } from "react";
// Fii atent la cale: urcăm un nivel din components/ în decision-engine/ apoi intrăm în mock/
import {
  decisionScenarios,
  type DecisionScenario,
} from "../mock/decisionScenarios.mock";

const DecisionCard: React.FC<DecisionScenario> = ({ status, score }) => {
  // Configurație bazată pe task-ul 2.3 [cite: 242-263]
  const config = {
    approved: {
      icon: "✅",
      title: "Felicitări! Eşti aprobat!",
      color: "bg-green-100 border-green-500 text-green-800",
      message: "Poți continua cu aplicația de credit.",
      buttonText: "Aplică pentru credit",
    },
    rejected: {
      icon: "❌",
      title: "Ne pare rău",
      color: "bg-red-100 border-red-500 text-red-800",
      message: "Scorul tău nu îndeplineşte criteriile minime.",
      buttonText: "Vezi sugestii de îmbunătățire",
    },
    pending: {
      icon: "⏳",
      title: "În verificare",
      color: "bg-yellow-100 border-yellow-500 text-yellow-800",
      message: "Aplicația ta necesită verificare manuală.",
      buttonText: "Contactează suport",
    },
  };

  const { icon, title, color, message, buttonText } = config[status];

  return (
    <div className={`p-6 rounded-lg border-2 shadow-sm ${color}`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="font-medium my-4">Scorul tău: {score}/100</p>
      <p className="text-sm opacity-90">{message}</p>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-md">
        {buttonText}
      </button>
    </div>
  );
};

export const DecisionResultCard: React.FC = () => {
  const [randomScenario, setRandomScenario] = useState<DecisionScenario | null>(
    null
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * decisionScenarios.length);
    setRandomScenario(decisionScenarios[randomIndex]);
  }, []);

  if (!randomScenario)
    return <div className="p-4 text-center">Se analizează datele...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Status Aplicație Credit
      </h1>
      <DecisionCard
        status={randomScenario.status}
        score={randomScenario.score}
      />
    </div>
  );
};

export default DecisionResultCard;
