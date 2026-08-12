import Anthropic from "@anthropic-ai/sdk";
import prisma from "@/lib/prisma";
import { sanitizeContent } from "@/lib/sanitize";

interface GenerateResult {
  success: true;
  post: { id: string; title: string; slug: string; status: string };
}

interface GenerateError {
  success: false;
  error: string;
}

export async function generateArticle(opts: {
  topic: string;
  context?: string;
  categoryId?: string;
  authorId: string;
}): Promise<GenerateResult | GenerateError> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { success: false, error: "ANTHROPIC_API_KEY not configured" };
  }

  if (!opts.topic || opts.topic.trim().length < 5) {
    return { success: false, error: "Topic must be at least 5 characters" };
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = `You are an investigative journalist writing for scamreports, a Swiss-based fraud and scam reporting publication styled like The New York Times.

Your task: Write a thorough, factual investigative article about the given topic.

RULES:
- Write in English, journalistic tone — serious, precise, no sensationalism
- Use HTML formatting: <h2> for section headings, <p> for paragraphs, <blockquote> for quotes, <strong> for emphasis, <ul>/<li> for bullet lists
- DO NOT use <h1> — the title is separate
- Include specific details: dates, company names, registration numbers, amounts, locations
- Always include a legal disclaimer at the end noting presumption of innocence
- Keep names out of <h2> headings — use descriptive headings instead
- Cite sources where possible (regulatory filings, news reports, commercial registers)
- Aim for 1500-2500 words
- Structure: Introduction → Key Facts → Investigation sections → What investors should know → Disclaimer

Also generate:
1. A compelling article title (without personal names in it)
2. A 1-2 sentence excerpt/summary
3. Relevant tags (comma-separated)
4. SEO keywords (comma-separated)
5. Estimated reading time in minutes

Return your response in this exact JSON format:
{
  "title": "Article title here",
  "excerpt": "Short summary here",
  "content": "<p>Full HTML article content here...</p>",
  "tags": "tag1, tag2, tag3",
  "keywords": "keyword1, keyword2, keyword3",
  "readingTime": 8
}

Return ONLY valid JSON, no markdown code fences, no explanation.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: `Write an investigative article about: ${opts.topic.trim()}${opts.context ? `\n\nAdditional context/notes:\n${opts.context.trim()}` : ""}`,
        },
      ],
      system: systemPrompt,
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { success: false, error: "AI returned invalid JSON. Try again." };
    }

    const slug = parsed.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 100);

    const existing = await prisma.post.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const post = await prisma.post.create({
      data: {
        title: parsed.title,
        slug: finalSlug,
        content: sanitizeContent(parsed.content),
        excerpt: parsed.excerpt || "",
        tags: parsed.tags || "",
        keywords: parsed.keywords || "",
        readingTime: parsed.readingTime || 8,
        status: "DRAFT",
        authorId: opts.authorId,
        categoryId: opts.categoryId || null,
      },
    });

    return {
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: `AI generation failed: ${message}` };
  }
}
