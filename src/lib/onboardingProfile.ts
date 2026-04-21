import { translations } from "@/i18n/translations";

const STORAGE_KEY = "btech_onboarding_profile";

export type OnboardingProfile = {
  userRole: string;
  goals: string;
  painPoints: string;
  userName: string;
  language: "en" | "fr";
};

export function buildProfileFromAnswers(
  answers: Record<number, string>,
  lang: "en" | "fr",
): OnboardingProfile {
  const steps = translations.onboarding.steps;
  const defaultName = lang === "fr" ? "Utilisateur" : "User";

  return {
    userRole: answers[0] || steps[0].options?.[0]?.[lang] || "Professional",
    goals: answers[1] || steps[1].options?.[0]?.[lang] || "Save time",
    painPoints: answers[4] || steps[4].options?.[0]?.[lang] || "Planning my day",
    userName: answers[5] || defaultName,
    language: lang,
  };
}

export function saveOnboardingProfile(profile: OnboardingProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getOnboardingProfile(): OnboardingProfile | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as OnboardingProfile;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}
