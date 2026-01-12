import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

interface Props {
  status: "approved" | "rejected" | "pending";
  score: number;
}

export default function ScoringStatusCard({ status, score }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md cursor-pointer group"
      onClick={() => navigate("/dashboard/decision-result")}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Iconița albastră, ca la celelalte carduri */}
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Ultimul Calcul
          </h3>
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
          Vezi detalii →
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Scor calculat:
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {score}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Status evaluare:
          </span>
          <span
            className={`text-sm font-bold px-2 py-1 rounded-md ${
              status === "approved"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status === "approved" ? "✓ Eligibil" : "În așteptare"}
          </span>
        </div>
      </div>
    </div>
  );
}
