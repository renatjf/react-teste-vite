import { NextResponse } from "next/server";
import { getApiPostById } from "@/lib/api-posts";

export async function GET(request, { params }) {
  const { id } = await params;
  const post = getApiPostById(id);

  if (!post) {
    return NextResponse.json(
      { error: `Post ${id} não encontrado.` },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}
