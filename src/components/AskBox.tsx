"use client";

import { FormEvent, useRef, useState } from "react";
import { btn } from "./ui";
import { cx } from "@/lib/cx";

const DEFAULT_QUESTION =
  "I have a part with 4 bends and its 14 inches long whats is the cost?";

const EXAMPLES = [
  "Can you form 3/8 in S-hooks?",
  "What's the minimum order?",
  "How do you price a form?",
] as const;

export function AskBox() {
  const [query, setQuery] = useState(DEFAULT_QUESTION);
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const askingRef = useRef(false);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || askingRef.current) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    askingRef.current = true;

    setQuery(text);
    setAsking(true);
    setAskError("");
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not get an answer.");
      }

      if (!res.body) throw new Error("Could not get an answer.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let next = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        next += decoder.decode(value, { stream: true });
        setAnswer(next);
      }
      next += decoder.decode();
      setAnswer(next.trim());
    } catch (err) {
      if (controller.signal.aborted) return;
      setAskError(err instanceof Error ? err.message : "Could not get an answer.");
    } finally {
      askingRef.current = false;
      if (!controller.signal.aborted) setAsking(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(query);
  }

  return (
    <section className="mt-16 border border-line bg-inset p-6 sm:p-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-copper">
        Ask the shop
      </p>
      <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl">
        Type a question. Get an answer.
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        4–14 mm CNC, 100-piece minimum, Northeast Ohio. Stock tooling in
        3/8, 7/16, and 1/2 in. Steels and aluminum from coil, including
        6061-T6. Instant quotes go to quote-department review.
      </p>

      <form onSubmit={onSubmit} className="mt-8">
        <label htmlFor="shop-ask" className="sr-only">
          Ask USA Wire Form a question
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <input
            id="shop-ask"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={DEFAULT_QUESTION}
            autoComplete="off"
            className="h-16 w-full flex-1 rounded-sm border border-line bg-background px-4 text-lg outline-none placeholder:text-muted/60 focus:border-copper sm:text-xl"
          />
          <button
            type="submit"
            disabled={asking || !query.trim()}
            className={cx(btn.quote, "h-16 min-w-32 px-8 text-lg disabled:opacity-50")}
          >
            {asking ? "Asking…" : "Ask"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => void ask(example)}
            disabled={asking}
            className="rounded-sm border border-line bg-background px-3 py-2 text-sm text-muted hover:border-copper/50 hover:text-foreground disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>

      {askError ? (
        <p className="mt-6 text-base text-muted">{askError}</p>
      ) : asking || answer ? (
        <div className="mt-6 border border-line bg-background px-5 py-5">
          <p className="whitespace-pre-wrap text-base leading-7 text-foreground sm:text-lg">
            {answer || "Reading the shop facts…"}
          </p>
        </div>
      ) : null}
    </section>
  );
}
