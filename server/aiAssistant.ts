type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type OnboardingProfile = {
  userRole?: string;
  goals?: string;
  painPoints?: string;
  userName?: string;
  language?: "en" | "fr";
};

type AssistantRequest = {
  message: string;
  profile?: OnboardingProfile;
  history?: ChatMessage[];
};

function buildSystemPrompt(profile: OnboardingProfile | undefined) {
  const role = profile?.userRole || "professional";
  const goals = profile?.goals || "save time and improve daily productivity";
  const painPoints = profile?.painPoints || "daily planning and task organization";

  return [
    `You are a productivity assistant helping a ${role}.`,
    `Your goal is to help save time, organize tasks, and improve efficiency.`,
    `The user's goals are: ${goals}.`,
    `Their main challenges are: ${painPoints}.`,
    "You are a paid productivity worker, not a generic chatbot.",
    "Always return practical, structured, and action-oriented outputs.",
    "Prefer concise sections with headings and bullet points.",
    "When useful, include a short step-by-step execution plan the user can start immediately.",
    "Keep tone professional, clear, and encouraging.",
  ].join(" ");
}

function extractTextFromResponse(data: unknown): string {
  if (!data || typeof data !== "object") return "";

  const maybeText = (data as { output_text?: unknown }).output_text;
  if (typeof maybeText === "string" && maybeText.trim()) return maybeText.trim();

  const output = (data as { output?: unknown }).output;
  if (Array.isArray(output)) {
    const chunks: string[] = [];
    for (const item of output) {
      if (!item || typeof item !== "object") continue;
      const content = (item as { content?: unknown }).content;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (!block || typeof block !== "object") continue;
        const text = (block as { text?: unknown }).text;
        if (typeof text === "string" && text.trim()) chunks.push(text.trim());
      }
    }
    return chunks.join("\n\n").trim();
  }

  return "";
}

export async function generateAssistantReply({ message, profile, history = [] }: AssistantRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing on the server.");
  }

  const recentHistory = history.slice(-6).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const input = [
    { role: "system", content: buildSystemPrompt(profile) },
    ...recentHistory,
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input,
      temperature: 0.7,
      max_output_tokens: 450,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${details}`);
  }

  const data = await response.json();
  const output = extractTextFromResponse(data);

  if (!output) {
    return "I can help with this. Share one concrete outcome you need today, and I will create a focused action plan.";
  }

  return output;
}
