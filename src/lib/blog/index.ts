import { articles } from "./articles";
import { briefings } from "./briefings";
import type { BlogPost } from "./types";
import { postPath } from "./types";

export type { BlogBlock, BlogPost } from "./types";
export { postPath };

const bySlug = new Map(
  [...articles, ...briefings].map((post) => [post.slug, post]),
);

export function allPosts(): BlogPost[] {
  return [...articles, ...briefings].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title),
  );
}

export function publishedArticles(): BlogPost[] {
  return articles
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function allBriefings(): BlogPost[] {
  return briefings;
}

export function getPost(slug: string) {
  return bySlug.get(slug);
}

export function ohioDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

export function ohioDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function dayOfYearOhio(date = new Date()) {
  const { year, month, day } = ohioDateParts(date);
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);
  return Math.floor((current - start) / 86_400_000);
}

export function todaysBriefing(date = new Date()) {
  const index = dayOfYearOhio(date) % briefings.length;
  return briefings[index];
}

export function formatPostDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
