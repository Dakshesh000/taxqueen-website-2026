/**
 * Quiz question options - centralized for maintainability
 */
import {
  Building,
  Laptop,
  Briefcase,
  DollarSign,
  Wallet,
  MoreHorizontal,
  MapPin,
  Globe,
  Plane,
  HelpCircle,
  AlertTriangle,
  Shuffle,
  AlertCircle,
  UserX,
  Bot,
  CheckCircle,
  Circle,
  CircleDashed,
  FileX,
  FileText,
  Calendar,
  Compass,
  Heart,
} from "lucide-react";
import React from "react";

export const incomeOptions = [
  { id: "business-freelance-1099", label: "Business Owner / Freelancing / Contract (1099)", icon: React.createElement(Laptop, { className: "w-5 h-5" }) },
  { id: "w2", label: "W-2 Employee", icon: React.createElement(Briefcase, { className: "w-5 h-5" }) },
  { id: "retirement", label: "Retirement/SS/Pension", icon: React.createElement(Wallet, { className: "w-5 h-5" }) },
  { id: "rental", label: "Rental Income", icon: React.createElement(Building, { className: "w-5 h-5" }) },
  { id: "investments", label: "Investments", icon: React.createElement(DollarSign, { className: "w-5 h-5" }) },
  { id: "other", label: "Other", icon: React.createElement(MoreHorizontal, { className: "w-5 h-5" }) },
];

export const nomadicLifeOptions = [
  { id: "330days", label: "I spend over 330 days outside the USA in a year", icon: React.createElement(Globe, { className: "w-5 h-5" }) },
  { id: "visa-abroad", label: "I have a visa to live outside of the USA", icon: React.createElement(Plane, { className: "w-5 h-5" }) },
  { id: "multistate", label: "I've worked or earned income in multiple states", icon: React.createElement(MapPin, { className: "w-5 h-5" }) },
  { id: "planning", label: "Still planning my Nomadic life", icon: React.createElement(Compass, { className: "w-5 h-5" }) },
];

export const situationOptions = [
  { id: "tax-averse", label: "I am highly averse to paying taxes", icon: React.createElement(AlertTriangle, { className: "w-5 h-5" }) },
  { id: "mixed-expenses", label: "I mix personal and business expenses sometimes", icon: React.createElement(Shuffle, { className: "w-5 h-5" }) },
  { id: "worried-mistakes", label: "I worry about doing something wrong", icon: React.createElement(AlertCircle, { className: "w-5 h-5" }) },
  { id: "bad-accountant", label: "My last accountant didn't provide the customer service I was hoping for", icon: React.createElement(UserX, { className: "w-5 h-5" }) },
  { id: "nomad-accountant", label: "Looking for an accountant that gets the digital nomad life", icon: React.createElement(Heart, { className: "w-5 h-5" }) },
  { id: "no-ai-trust", label: "I don't trust AI to give me the relevant guidance for my tax situation", icon: React.createElement(Bot, { className: "w-5 h-5" }) },
];

export const financialTrackingOptions = [
  { id: "super-organized", label: "Super organized", icon: React.createElement(CheckCircle, { className: "w-5 h-5" }) },
  { id: "pretty-organized", label: "Pretty organized", icon: React.createElement(Circle, { className: "w-5 h-5" }) },
  { id: "somewhat-unorganized", label: "Somewhat unorganized", icon: React.createElement(CircleDashed, { className: "w-5 h-5" }) },
  { id: "very-unorganized", label: "Very unorganized", icon: React.createElement(FileX, { className: "w-5 h-5" }) },
  { id: "no-documentation", label: "I don't document miles and never save receipts", icon: React.createElement(FileX, { className: "w-5 h-5" }) },
];

export const lookingForOptions = [
  { id: "current-filing", label: "Need help with the current filing", icon: React.createElement(FileText, { className: "w-5 h-5" }) },
  { id: "unfiled-years", label: "Haven't filed in years", icon: React.createElement(Calendar, { className: "w-5 h-5" }) },
  { id: "questions", label: "Have lots of questions", icon: React.createElement(HelpCircle, { className: "w-5 h-5" }) },
];

export const urgencyLabels = ["This Month", "This Quarter", "This Year", "Not Anytime Soon"];
