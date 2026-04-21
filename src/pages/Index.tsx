import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Zap, Clock, Brain, ArrowRight, Star } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

const benefitIcons = [Clock, Brain, Zap];

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();
  const tx = translations;

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) localStorage.setItem("affiliate_ref", ref);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-heading text-xl font-bold text-foreground">
            B-<span className="text-primary">TECH</span>
          </span>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>
              {t(tx.nav.login, lang)}
            </Button>
            <Button onClick={() => navigate("/login")}>
              {t(tx.nav.start, lang)}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
          <Zap className="h-3.5 w-3.5" />
          {t(tx.hero.badge, lang)}
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          {t(tx.hero.title1, lang)}{" "}
          <span className="text-primary">{t(tx.hero.titleHighlight, lang)}</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t(tx.hero.subtitle, lang)}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base px-8 h-12" onClick={() => navigate("/login")}>
            {t(tx.hero.cta, lang)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-muted-foreground">{t(tx.hero.ctaSub, lang)}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          {t(tx.benefits.title, lang)}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {t(tx.benefits.subtitle, lang)}
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tx.benefits.items.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <Card key={i} className="border border-border bg-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t(b.title, lang)}</h3>
                  <p className="text-muted-foreground text-sm">{t(b.description, lang)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-primary bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-primary mb-2">{t(tx.pricing.plan, lang)}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-foreground">{tx.pricing.price}</span>
                  <span className="text-muted-foreground">{t(tx.pricing.period, lang)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t(tx.pricing.subtitle, lang)}</p>
              </div>
              <ul className="mt-8 space-y-3">
                {tx.pricing.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {t(f, lang)}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 h-12 text-base" onClick={() => navigate("/login")}>
                {t(tx.pricing.cta, lang)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">{t(tx.pricing.cancel, lang)}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
          {t(tx.testimonials.title, lang)}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tx.testimonials.items.map((item, i) => (
            <Card key={i} className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4">"{t(item.text, lang)}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{t(item.role, lang)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary rounded-2xl p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
            {t(tx.cta.title, lang)}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            {t(tx.cta.subtitle, lang)}
          </p>
          <Button size="lg" variant="secondary" className="text-base px-8 h-12" onClick={() => navigate("/login")}>
            {t(tx.cta.button, lang)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          {t(tx.footer.copy, lang)}
        </div>
      </footer>
    </div>
  );
};

export default Index;
