/**
 * Type definitions for the Quiz system
 */

export interface QuizAnswers {
  usTaxObligations: boolean | null;
  incomeSources: string[];
  expatCountry: string;
  isExpat: boolean;
  nomadicLife: string[];
  situations: string[];
  financialTracking: string | null;
  lookingFor: string[];
  urgency: number;
  name: string;
  email: string;
  phone: string;
}

export interface GlobalQuizProps {
  isEmbedded?: boolean;
}

export interface QualificationResult {
  qualified: boolean;
  reasons: string[];
}

export const createInitialAnswers = (): QuizAnswers => ({
  usTaxObligations: null,
  incomeSources: [],
  expatCountry: "",
  isExpat: true,
  nomadicLife: [],
  situations: [],
  financialTracking: null,
  lookingFor: [],
  urgency: 0,
  name: "",
  email: "",
  phone: "",
});
