import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const encode = (value: unknown) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

export async function GET() {
  const secret = process.env.API_JWT_SECRET;
  if (!secret)
    return NextResponse.json(
      { message: "API_JWT_SECRET is not configured." },
      { status: 500 },
    );

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return NextResponse.json(
      { message: "Please sign in first." },
      { status: 401 },
    );

  const now = Math.floor(Date.now() / 1000);
  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({
    sub: session.user.id,
    email: session.user.email.toLowerCase(),
    name: session.user.name,
    iat: now,
    exp: now + 60 * 60,
  });
  const unsigned = `${header}.${payload}`;
  const signature = createHmac("sha256", secret)
    .update(unsigned)
    .digest("base64url");
  return NextResponse.json({ token: `${unsigned}.${signature}` });
}
