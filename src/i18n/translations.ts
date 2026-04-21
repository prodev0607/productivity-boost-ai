export type Lang = "en" | "fr";

export const translations = {
  nav: {
    login: { en: "Log in", fr: "Connexion" },
    start: { en: "Get started", fr: "Commencer" },
    logout: { en: "Log out", fr: "Déconnexion" },
  },
  hero: {
    badge: { en: "Powered by artificial intelligence", fr: "Propulsé par l'intelligence artificielle" },
    title1: { en: "Save time and multiply your", fr: "Économisez du temps et multipliez votre" },
    titleHighlight: { en: "productivity", fr: "productivité" },
    subtitle: {
      en: "Your personal AI assistant that automates tasks, organizes your work, and delivers results in seconds. For professionals and small businesses.",
      fr: "Votre assistant IA personnel qui automatise les tâches, organise votre travail et livre des résultats en secondes. Pour les professionnels et les petites entreprises.",
    },
    cta: { en: "Start for $39/mo", fr: "Commencer à 39$/mois" },
    ctaSub: { en: "No contracts · Cancel anytime", fr: "Sans contrat · Annulez quand vous voulez" },
  },
  benefits: {
    title: { en: "Everything you need to be more productive", fr: "Tout ce qu'il vous faut pour être plus productif" },
    subtitle: {
      en: "No learning curve. No complicated setup. Just results.",
      fr: "Pas de courbe d'apprentissage. Aucune configuration compliquée. Juste des résultats.",
    },
    items: [
      {
        title: { en: "Save 10+ hours/week", fr: "Économisez +10 heures/semaine" },
        description: {
          en: "Automate repetitive tasks and focus on what truly matters for your business.",
          fr: "Automatisez les tâches répétitives et concentrez-vous sur ce qui compte vraiment pour votre entreprise.",
        },
      },
      {
        title: { en: "Organize your work", fr: "Organisez votre travail" },
        description: {
          en: "Structure your ideas, plan your day, and keep everything under control effortlessly.",
          fr: "Structurez vos idées, planifiez votre journée et gardez tout sous contrôle sans effort.",
        },
      },
      {
        title: { en: "Instant results", fr: "Résultats instantanés" },
        description: {
          en: "Generate content, answers, and action plans in seconds, not hours.",
          fr: "Générez du contenu, des réponses et des plans d'action en secondes, pas en heures.",
        },
      },
    ],
  },
  pricing: {
    plan: { en: "Professional Plan", fr: "Plan Professionnel" },
    price: "$39",
    period: { en: "/mo", fr: "/mois" },
    subtitle: { en: "All included, no surprises", fr: "Tout inclus, sans surprises" },
    features: [
      { en: "Unlimited AI assistant", fr: "Assistant IA illimité" },
      { en: "Personalized to your business", fr: "Personnalisé à votre entreprise" },
      { en: "Task automation", fr: "Automatisation des tâches" },
      { en: "Content generation", fr: "Génération de contenu" },
      { en: "Smart organization", fr: "Organisation intelligente" },
      { en: "Priority support", fr: "Support prioritaire" },
    ],
    cta: { en: "Get started", fr: "Commencer" },
    cancel: { en: "Cancel anytime · No commitment", fr: "Annulez quand vous voulez · Sans engagement" },
  },
  testimonials: {
    title: { en: "What our users say", fr: "Ce que disent nos utilisateurs" },
    items: [
      { name: "Marie G.", role: { en: "Freelancer", fr: "Pigiste" }, text: { en: "I got 2 hours back every day. Can't imagine working without it.", fr: "J'ai récupéré 2 heures chaque jour. Je ne peux pas imaginer travailler sans." } },
      { name: "Charles R.", role: { en: "Small business", fr: "Petite entreprise" }, text: { en: "Organizing my team now takes minutes, not hours.", fr: "Organiser mon équipe prend maintenant des minutes, pas des heures." } },
      { name: "Anne P.", role: { en: "Consultant", fr: "Consultante" }, text: { en: "My clients notice the difference in quality and speed.", fr: "Mes clients remarquent la différence en qualité et en rapidité." } },
    ],
  },
  cta: {
    title: { en: "Start saving time today", fr: "Commencez à économiser du temps aujourd'hui" },
    subtitle: {
      en: "Join hundreds of professionals who already optimize their day with B-TECH.",
      fr: "Rejoignez des centaines de professionnels qui optimisent déjà leur journée avec B-TECH.",
    },
    button: { en: "Start for $39/mo", fr: "Commencer à 39$/mois" },
  },
  footer: {
    copy: { en: "© 2026 B-TECH. All rights reserved.", fr: "© 2026 B-TECH. Tous droits réservés." },
  },
  login: {
    title: { en: "Access your account", fr: "Accédez à votre compte" },
    subtitle: { en: "Enter your email and we'll send you a magic link", fr: "Entrez votre courriel et nous vous enverrons un lien magique" },
    email: { en: "Your email", fr: "Votre courriel" },
    cta: { en: "Send magic link", fr: "Envoyer le lien magique" },
    sent: { en: "Check your inbox!", fr: "Vérifiez votre boîte de réception!" },
    sentSub: { en: "We've sent a magic link to", fr: "Nous avons envoyé un lien magique à" },
    diff: { en: "Use a different email", fr: "Utiliser un autre courriel" },
    back: { en: "Back to home", fr: "Retour à l'accueil" },
  },
  onboarding: {
    steps: [
      { question: { en: "What best describes you?", fr: "Qu'est-ce qui vous décrit le mieux?" }, description: { en: "This helps us personalize your experience", fr: "Cela nous aide à personnaliser votre expérience" }, options: [{ en: "Freelancer", fr: "Pigiste" }, { en: "Small business owner", fr: "Propriétaire de petite entreprise" }, { en: "Consultant", fr: "Consultant(e)" }, { en: "Remote employee", fr: "Employé(e) à distance" }] },
      { question: { en: "What's your main goal?", fr: "Quel est votre objectif principal?" }, description: { en: "We'll focus on what matters most to you", fr: "Nous nous concentrerons sur ce qui compte le plus pour vous" }, options: [{ en: "Save time", fr: "Gagner du temps" }, { en: "Be more organized", fr: "Être plus organisé(e)" }, { en: "Generate content", fr: "Générer du contenu" }, { en: "Automate tasks", fr: "Automatiser des tâches" }] },
      { question: { en: "How many hours/week do you spend on repetitive tasks?", fr: "Combien d'heures/semaine passez-vous sur des tâches répétitives?" }, description: { en: "This helps us measure your potential savings", fr: "Cela nous aide à mesurer vos économies potentielles" }, options: [{ en: "Less than 5 hours", fr: "Moins de 5 heures" }, { en: "5-10 hours", fr: "5-10 heures" }, { en: "10-20 hours", fr: "10-20 heures" }, { en: "More than 20 hours", fr: "Plus de 20 heures" }] },
      { question: { en: "What tools do you currently use?", fr: "Quels outils utilisez-vous actuellement?" }, description: { en: "We'll integrate with your workflow", fr: "Nous nous intégrerons à votre flux de travail" }, options: [{ en: "Google Workspace", fr: "Google Workspace" }, { en: "Microsoft 365", fr: "Microsoft 365" }, { en: "Notion / Trello", fr: "Notion / Trello" }, { en: "Others", fr: "Autres" }] },
      { question: { en: "What's your biggest daily challenge?", fr: "Quel est votre plus grand défi quotidien?" }, description: { en: "We'll prioritize solving this", fr: "Nous prioriserons la résolution de ce problème" }, options: [{ en: "Too many emails", fr: "Trop de courriels" }, { en: "Lack of organization", fr: "Manque d'organisation" }, { en: "Creating content", fr: "Créer du contenu" }, { en: "Planning my day", fr: "Planifier ma journée" }] },
      { question: { en: "What should we call you?", fr: "Comment devrions-nous vous appeler?" }, description: { en: "We'll use this to personalize your assistant", fr: "Nous utiliserons ceci pour personnaliser votre assistant" }, type: "text" as const },
    ],
    back: { en: "Back", fr: "Retour" },
    next: { en: "Next", fr: "Suivant" },
    finish: { en: "Start using B-TECH", fr: "Commencer à utiliser B-TECH" },
    placeholder: { en: "Your name", fr: "Votre nom" },
  },
  dashboard: {
    greeting: { en: "Hello", fr: "Bonjour" },
    subtitle: { en: "How can I help you today?", fr: "Comment puis-je vous aider aujourd'hui?" },
    placeholder: { en: "Ask me anything...", fr: "Demandez-moi n'importe quoi..." },
    quickActions: [
      { en: "Plan my day", fr: "Planifier ma journée" },
      { en: "Draft a professional email", fr: "Rédiger un courriel professionnel" },
      { en: "Organize my tasks", fr: "Organiser mes tâches" },
      { en: "Generate content ideas", fr: "Générer des idées de contenu" },
    ],
    response: { en: "Thanks for your message! I'm B-TECH, your AI productivity assistant. This is a demo — the full experience is coming soon.", fr: "Merci pour votre message! Je suis B-TECH, votre assistant IA de productivité. Ceci est une démo — l'expérience complète arrive bientôt." },
  },
} as const;

export function t(obj: Record<string, string>, lang: Lang): string {
  return obj[lang] || obj["en"];
}
