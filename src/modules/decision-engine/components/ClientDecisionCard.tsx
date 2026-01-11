import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ScoringResult } from "../types/decision.types";

interface Props {
  data: ScoringResult;
}

export const ClientDecisionCard = ({ data }: Props) => {
  const config = {
    approved: {
      icon: <CheckCircle2 className="w-12 h-12 text-green-600" />,
      title: "Felicitări! Ești aprobat!",
      color: "bg-green-100 border-green-500",
      message: "Poți continua cu aplicația de credit.",
      buttonText: "Aplică pentru credit",
      btnVariant: "default" as const,
    },
    rejected: {
      icon: <XCircle className="w-12 h-12 text-red-600" />,
      title: "Ne pare rău",
      color: "bg-red-100 border-red-500",
      message: "Scorul tău nu îndeplinește criteriile minime.",
      buttonText: "Vezi sugestii de îmbunătățire",
      btnVariant: "destructive" as const,
    },
    pending: {
      icon: <Clock className="w-12 h-12 text-yellow-600" />,
      title: "În așteptare",
      color: "bg-yellow-100 border-yellow-500",
      message: "Aplicația ta necesită verificare manuală.",
      buttonText: "Contactează suport",
      btnVariant: "outline" as const,
    },
  };

  const { icon, title, color, message, buttonText, btnVariant } =
    config[data.decision];

  return (
    <Card className={`w-full max-w-md border-2 shadow-xl ${color}`}>
      <CardHeader className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="p-4 bg-white/50 rounded-lg border border-white">
          <p className="text-sm font-medium text-gray-500 uppercase">
            Scorul tău
          </p>
          <div className="text-5xl font-black">{data.score}/100</div>
        </div>
        <p className="text-gray-700 font-medium">{message}</p>
        <p className="text-sm italic text-gray-500">{data.summary}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full py-6 text-lg font-bold" variant={btnVariant}>
          {buttonText} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
