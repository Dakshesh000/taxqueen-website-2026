/**
 * Quiz validation utilities
 */
import { EMAIL_REGEX, PHONE_REGEX } from "@/constants/layout";
import type { QuizAnswers, QualificationResult } from "./quizTypes";

export const validateEmail = (
  email: string,
  setError: (msg: string) => void
): boolean => {
  if (!email.trim()) {
    setError("Email is required");
    return false;
  }
  if (!EMAIL_REGEX.test(email)) {
    setError("Please enter a valid email address");
    return false;
  }
  setError("");
  return true;
};

export const validatePhone = (
  phone: string,
  setError: (msg: string) => void
): boolean => {
  if (!phone.trim()) {
    setError("Phone number is required");
    return false;
  }
  // Remove +1 prefix for validation if that's all there is
  const cleanedPhone = phone.replace(/^\+1\s*$/, "");
  if (!cleanedPhone || !PHONE_REGEX.test(phone)) {
    setError("Please enter a valid phone number");
    return false;
  }
  setError("");
  return true;
};

export const calculateQualification = (answers: QuizAnswers): QualificationResult => {
  const reasons: string[] = [];

  // Disqualifier 1: No US Tax Obligations
  if (answers.usTaxObligations === false) {
    reasons.push("No US tax obligations");
    return { qualified: false, reasons };
  }

  // Disqualifier 2: Tax averse AND (very unorganized OR no documentation)
  const isTaxAverse = answers.situations.includes("tax-averse");
  const isVeryUnorganized = answers.financialTracking === "very-unorganized";
  const hasNoDocumentation = answers.financialTracking === "no-documentation";

  if (isTaxAverse && (isVeryUnorganized || hasNoDocumentation)) {
    reasons.push("Not a good fit based on tax attitude and organization level");
    return { qualified: false, reasons };
  }

  // Qualified
  reasons.push("Good fit for services");
  return { qualified: true, reasons };
};

export const isSubmitDisabled = (
  answers: QuizAnswers,
  isSubmitting: boolean
): boolean => {
  if (!answers.name.trim()) return true;
  if (!answers.email.trim()) return true;
  if (!answers.phone.trim() || answers.phone.trim() === "+1") return true;
  if (isSubmitting) return true;
  return false;
};
