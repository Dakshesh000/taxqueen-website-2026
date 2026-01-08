import { createContext, useContext, useState, ReactNode } from "react";

type QuizPrefill = "usTaxYes" | "usTaxNo" | "";

interface QuizContextType {
  isQuizOpen: boolean;
  prefillUsTax: QuizPrefill;
  openQuiz: (usTaxAnswer?: "usTaxYes" | "usTaxNo") => void;
  closeQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [prefillUsTax, setPrefillUsTax] = useState<QuizPrefill>("");

  const openQuiz = (usTaxAnswer?: "usTaxYes" | "usTaxNo") => {
    setPrefillUsTax(usTaxAnswer || "");
    setIsQuizOpen(true);
  };

  const closeQuiz = () => {
    setIsQuizOpen(false);
    setPrefillUsTax("");
  };

  return (
    <QuizContext.Provider value={{ isQuizOpen, prefillUsTax, openQuiz, closeQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
