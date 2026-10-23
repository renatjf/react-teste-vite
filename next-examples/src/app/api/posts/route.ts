import { NextResponse } from "next/server";
import { addApiPost, getApiPosts } from "@/lib/api-posts";

export async function GET() {
  return NextResponse.json(getApiPosts());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";

    if (!title) {
      return NextResponse.json(
        { error: "O campo title é obrigatório." },
        { status: 400 }
      );
    }

    const post = addApiPost(title);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido. Envie JSON com title." },
      { status: 400 }
    );
  }
}
