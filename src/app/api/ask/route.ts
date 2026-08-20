import { streamText } from "ai";
import { shopAskSystemPrompt } from "@/lib/ask-prompt";

export const maxDuration = 30;

const MAX_QUESTION = 400;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 20;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function gatewayReady() {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.VERCEL,
  );
}

export async function POST(request: Request) {
  if (!gatewayReady()) {
    return Response.json(
      {
        error:
          "Ask is not configured. Add AI_GATEWAY_API_KEY for local use, or deploy on Vercel.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many questions from this connection. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let question = "";
  try {
    const body = (await request.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return Response.json({ error: "Send a question." }, { status: 400 });
  }

  if (!question) {
    return Response.json({ error: "Send a question." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION) {
    return Response.json(
      { error: `Keep questions under ${MAX_QUESTION} characters.` },
      { status: 400 },
    );
  }

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: shopAskSystemPrompt(),
    prompt: question,
  });

  return result.toTextStreamResponse();
}
