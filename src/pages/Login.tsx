import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();
  const tx = translations.login;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => navigate("/onboarding"), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t(tx.back, lang)}
          </Button>
          <LanguageToggle />
        </div>
        <Card className="border border-border bg-card">
          <CardContent className="p-8">
            {!sent ? (
              <>
                <div className="text-center mb-8">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">{t(tx.title, lang)}</h1>
                  <p className="text-sm text-muted-foreground mt-2">{t(tx.subtitle, lang)}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder={t(tx.email, lang)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  <Button type="submit" className="w-full h-12 text-base">
                    {t(tx.cta, lang)}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">{t(tx.sent, lang)}</h2>
                <p className="text-sm text-muted-foreground">
                  {t(tx.sentSub, lang)} <span className="font-medium text-foreground">{email}</span>
                </p>
                <Button variant="ghost" className="mt-6 text-sm" onClick={() => setSent(false)}>
                  {t(tx.diff, lang)}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
