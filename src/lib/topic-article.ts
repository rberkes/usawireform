export type TopicArticle = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  lede: string;
  keywords: string[];
  alsoCalled: string[];
  sections: { id: string; heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export function topicBySlug(pages: TopicArticle[], slug: string) {
  return pages.find((page) => page.slug === slug);
}
