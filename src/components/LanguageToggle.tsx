import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageToggle = ({ variant = "ghost" }: { variant?: "ghost" | "outline" }) => {
  const { lang, toggle } = useLanguage();

  return (
    <Button variant={variant} size="sm" onClick={toggle} className="gap-1.5 text-sm">
      <Globe className="h-4 w-4" />
      {lang === "en" ? "FR" : "EN"}
    </Button>
  );
};
