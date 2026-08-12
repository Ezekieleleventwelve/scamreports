import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { generateArticle } from "@/lib/generate-article";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const ALLOWED_CHAT_IDS = (process.env.TELEGRAM_ALLOWED_CHAT_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

async function sendTelegramMessage(chatId: number | string, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

async function getAdminUserId(): Promise<string | null> {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });
  return admin?.id || null;
}

// Verify Telegram webhook using secret_token header (official Telegram method)
function verifyTelegramRequest(req: NextRequest): boolean {
  // Method 1: Telegram's built-in secret_token header
  const telegramSecret = req.headers.get("x-telegram-bot-api-secret-token");
  if (WEBHOOK_SECRET && telegramSecret) {
    return crypto.timingSafeEqual(
      Buffer.from(telegramSecret),
      Buffer.from(WEBHOOK_SECRET)
    );
  }
  // Method 2: Query param fallback
  const paramSecret = req.nextUrl.searchParams.get("secret");
  if (WEBHOOK_SECRET && paramSecret) {
    try {
      return crypto.timingSafeEqual(
        Buffer.from(paramSecret),
        Buffer.from(WEBHOOK_SECRET)
      );
    } catch {
      return false;
    }
  }
  // If no secret configured, reject (require secret in production)
  if (WEBHOOK_SECRET) return false;
  return true;
}

// Block all non-POST methods — return generic 404 to hide endpoint
export async function GET() {
  return new NextResponse(null, { status: 404 });
}

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN) {
    return new NextResponse(null, { status: 404 });
  }

  // Verify request authenticity
  if (!verifyTelegramRequest(req)) {
    return new NextResponse(null, { status: 404 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const message = body.message;
  if (!message || !message.text) {
    return NextResponse.json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text.trim();

  // Only allow specific chat IDs — silent reject for unauthorized
  if (ALLOWED_CHAT_IDS.length > 0 && !ALLOWED_CHAT_IDS.includes(String(chatId))) {
    return NextResponse.json({ ok: true });
  }

  // Handle commands
  if (text === "/start" || text === "/help") {
    await sendTelegramMessage(
      chatId,
      `🗞 <b>AI Generator</b>\n\nSend a topic to generate an investigative draft.\n\n<b>Usage:</b>\n<code>Savendis AG Zürich phone brokerage fraud</code>\n\nAdd context on the next line:\n<code>DeFi.ch crypto scam\nBased in Switzerland, promises 30% returns</code>\n\n<b>Commands:</b>\n/drafts — Recent drafts\n/help — This message`
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/drafts") {
    const drafts = await prisma.post.findMany({
      where: { status: "DRAFT" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { title: true, createdAt: true },
    });

    if (drafts.length === 0) {
      await sendTelegramMessage(chatId, "No drafts found.");
    } else {
      const list = drafts
        .map((d, i) => `${i + 1}. ${d.title}`)
        .join("\n");
      await sendTelegramMessage(chatId, `📝 <b>Recent Drafts:</b>\n\n${list}`);
    }
    return NextResponse.json({ ok: true });
  }

  // Parse topic and optional context (separated by newline)
  const lines = text.split("\n");
  const topic = lines[0].trim();
  const context = lines.slice(1).join("\n").trim() || undefined;

  if (topic.length < 5) {
    await sendTelegramMessage(chatId, "Topic too short (min 5 chars).");
    return NextResponse.json({ ok: true });
  }

  const adminId = await getAdminUserId();
  if (!adminId) {
    await sendTelegramMessage(chatId, "System error. Try later.");
    return NextResponse.json({ ok: true });
  }

  await sendTelegramMessage(
    chatId,
    `⏳ Generating...\n<b>${topic}</b>\n\n~30-60 seconds`
  );

  const result = await generateArticle({
    topic,
    context,
    authorId: adminId,
  });

  if (result.success) {
    await sendTelegramMessage(
      chatId,
      `✅ <b>Draft ready</b>\n\n${result.post.title}\n\nOpen admin panel to review & publish.`
    );
  } else {
    await sendTelegramMessage(chatId, `Failed: ${result.error}`);
  }

  return NextResponse.json({ ok: true });
}
