import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { randomBytes } from "crypto";
import path from "path";
import { requireAuth } from "@/lib/auth-guard";
import { rateLimit } from "@/lib/rate-limit";
import { logIpAction } from "@/lib/ip";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "avif"];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Magic byte signatures for image formats
const MAGIC_BYTES: Record<string, number[][]> = {
  jpeg: [[0xff, 0xd8, 0xff]],
  jpg: [[0xff, 0xd8, 0xff]],
  png: [[0x89, 0x50, 0x4e, 0x47]],
  gif: [[0x47, 0x49, 0x46, 0x38]],
  webp: [[0x52, 0x49, 0x46, 0x46]], // RIFF header
  avif: [], // AVIF uses ftyp box, complex to check — rely on MIME
};

function validateMagicBytes(buffer: Buffer, ext: string): boolean {
  const signatures = MAGIC_BYTES[ext];
  if (!signatures || signatures.length === 0) return true; // Skip if no signature defined
  return signatures.some((sig) =>
    sig.every((byte, i) => buffer[i] === byte)
  );
}

export async function POST(req: NextRequest) {
  // Rate limit: 10 uploads per 10 minutes
  const limited = await rateLimit("upload", 10, 10 * 60 * 1000);
  if (limited) return limited;

  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate MIME type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only images are allowed." },
      { status: 400 }
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum 5MB." },
      { status: 400 }
    );
  }

  // Validate extension
  const rawExt = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
    return NextResponse.json(
      { error: "Invalid file extension." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate magic bytes — ensure file content matches claimed type
  if (!validateMagicBytes(buffer, rawExt)) {
    return NextResponse.json(
      { error: "File content does not match file type." },
      { status: 400 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Use crypto-safe random filename
  const filename = `${Date.now()}-${randomBytes(16).toString("hex")}.${rawExt}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  await logIpAction(auth.userId, "FILE_UPLOADED", JSON.stringify({ filename }));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
