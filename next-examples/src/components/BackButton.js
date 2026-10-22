"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button className="btn btn-secondary" onClick={() => router.back()}>
      ← Voltar (useRouter)
    </button>
  );
}
