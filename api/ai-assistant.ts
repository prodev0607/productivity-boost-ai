import type { IncomingMessage, ServerResponse } from "node:http";
import { generateAssistantReply } from "../server/aiAssistant.js";

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const body = (await readJsonBody(req)) as {
      message?: string;
      profile?: { userRole?: string; goals?: string; painPoints?: string; userName?: string; language?: "en" | "fr" };
      history?: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!body.message || !body.message.trim()) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Message is required" }));
      return;
    }

    const reply = await generateAssistantReply({
      message: body.message.trim(),
      profile: body.profile,
      history: body.history,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ reply }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate response",
      }),
    );
  }
}
