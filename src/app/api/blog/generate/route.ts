import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { saveBlogPost, type BlogCategory } from "@/lib/blog";
import { getRotatingTopic, getDayOfYear, type BlogTopic } from "@/lib/blog-topics";
import { COMPANY } from "@/lib/company";

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const customTopic = body.topic as BlogTopic | undefined;
    const featured = body.featured as boolean | undefined;

    const topic = customTopic || getRotatingTopic(getDayOfYear());

    const systemPrompt = `You are an expert technical writer for ${COMPANY}, a wire forming manufacturer with 50+ years of experience in CNC wire bending, based in Northeast Ohio. 

Write informative, professional blog posts about the wire forming industry. Your tone should be:
- Technically accurate but accessible
- Professional and authoritative
- Practical with actionable insights
- Focused on the manufacturing industry perspective

Format your response as a JSON object with the following fields:
- title: A compelling, SEO-friendly title (50-70 characters)
- excerpt: A brief summary of the article (150-200 characters)
- content: The full article content in markdown format (800-1200 words)

Use markdown formatting in the content:
- Use ## for main section headings
- Use ### for subsections
- Use bullet points for lists
- Write in clear paragraphs

Do not include the title in the content - it will be displayed separately.`;

    const userPrompt = `Write a blog post about: ${topic.title}

Topic guidance: ${topic.prompt}

Tags to incorporate naturally: ${topic.tags.join(", ")}

Remember to:
1. Include specific technical details relevant to wire forming
2. Reference industry standards, equipment, or materials where appropriate
3. Provide practical takeaways for manufacturers and engineers
4. Keep the content focused and valuable for readers in the metal forming industry`;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
    });

    let parsed: { title: string; excerpt: string; content: string };
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: text },
        { status: 500 }
      );
    }

    const post = await saveBlogPost({
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category: topic.category,
      tags: topic.tags,
      publishedAt: new Date().toISOString(),
      author: COMPANY,
      featured: featured ?? false,
    });

    return NextResponse.json({
      success: true,
      post: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        publishedAt: post.publishedAt,
      },
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return POST(request);
}
