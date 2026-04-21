import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, LogOut } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = translations.dashboard;

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { role: "user", content: msg };
    const botMsg: Message = { role: "assistant", content: t(tx.response, lang) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <span className="font-heading text-lg font-bold text-foreground">
            B-<span className="text-primary">TECH</span>
          </span>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <LogOut className="h-4 w-4" />
              {t(translations.nav.logout, lang)}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center pt-16">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                {t(tx.greeting, lang)} 👋
              </h1>
              <p className="text-muted-foreground mb-8">{t(tx.subtitle, lang)}</p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {tx.quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(t(action, lang))}
                    className="text-left p-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors text-sm text-foreground"
                  >
                    {t(action, lang)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEnd} />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-card/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="container mx-auto max-w-2xl px-4 py-4 flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(tx.placeholder, lang)}
            className="h-12"
          />
          <Button type="submit" size="icon" className="h-12 w-12 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
