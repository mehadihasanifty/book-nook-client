import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Add IMGBB_API_KEY to the client .env file to enable cover uploads.",
      },
      { status: 503 },
    );
  }

  try {
    const incoming = await request.formData();
    const image = incoming.get("image");
    if (!(image instanceof File))
      return NextResponse.json(
        { message: "Choose a cover image first." },
        { status: 400 },
      );
    if (!image.type.startsWith("image/") || image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Choose an image under 10 MB." },
        { status: 400 },
      );
    }

    const body = new FormData();
    body.set("image", image);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body },
    );
    const result = await response.json();
    if (!response.ok || !result.success || !result.data?.url) {
      return NextResponse.json(
        { message: result.error?.message || "Image upload failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: result.data.url });
  } catch {
    return NextResponse.json(
      { message: "Image upload failed. Please try again." },
      { status: 500 },
    );
  }
}
