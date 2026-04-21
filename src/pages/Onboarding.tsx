import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { lang } = useLanguage();
  const steps = translations.onboarding.steps;
  const tx = translations.onboarding;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (isLast) {
      navigate("/dashboard");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <span className="font-heading text-lg font-bold text-foreground">
            B-<span className="text-primary">TECH</span>
          </span>
          <LanguageToggle />
        </div>

        <Progress value={progress} className="mb-8 h-2" />

        <Card className="border border-border bg-card">
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {t(step.question, lang)}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">{t(step.description, lang)}</p>

            {"type" in step && step.type === "text" ? (
              <Input
                placeholder={t(tx.placeholder, lang)}
                value={answers[currentStep] || ""}
                onChange={(e) => handleSelect(e.target.value)}
                className="h-12"
              />
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {"options" in step && step.options?.map((option, i) => {
                  const label = t(option, lang);
                  const selected = answers[currentStep] === label;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(label)}
                      className={`text-left p-4 rounded-lg border transition-all ${
                        selected
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t(tx.back, lang)}
              </Button>
              <Button onClick={handleNext} disabled={!answers[currentStep]} className="gap-2">
                {isLast ? t(tx.finish, lang) : t(tx.next, lang)}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
