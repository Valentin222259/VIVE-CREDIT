import { useNavigate } from "react-router-dom";

interface Props {
  status: "approved" | "rejected" | "pending";
  score: number;
}

export default function ScoringStatusCard({ status, score }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/dashboard/decision-result", {
          state: {
            scoringResult: {
              score: score,
              status: status,
              explicatie: "Scor calculat pentru test.",
            },
          },
        });
      }}
      className="w-full cursor-pointer rounded-[2rem] bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#2563eb] p-8 text-white shadow-xl transition-all hover:scale-[1.02] dark:ring-1 dark:ring-white/10 dark:shadow-green-900/20"
    >
      <div className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight">
        <span className="text-orange-500">⚡</span> Ultimul Calcul
      </div>

      {/* Butonul care ne duce din card in calculator*/}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/calculator");
        }}
        className="text-xs font-semibold bg-white/20 hover:bg-white/40 px-3 py-1.5 rounded-full border border-white/30 transition-all"
      >
        Calculator →
      </button>

      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium opacity-90">Scor:</span>
        {/* FOLOSIM variabila score aici */}
        <span className="text-2xl font-extrabold">{score}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-medium opacity-90">Status:</span>
        <span className="flex items-center gap-1 text-2xl font-extrabold tracking-wide">
          {/* FOLOSIM variabila status aici */}
          {status === "approved"
            ? "✓ Eligibil"
            : status === "pending"
            ? "În așteptare"
            : "✕ Neeligibil"}
        </span>
      </div>
    </div>
  );
}
