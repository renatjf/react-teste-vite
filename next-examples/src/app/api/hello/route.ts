import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Olá da API Route!",
    method: "GET",
    timestamp: new Date().toISOString(),
  });
}
