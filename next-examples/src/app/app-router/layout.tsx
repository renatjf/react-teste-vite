import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutCounter } from "@/components/LayoutCounter";

export default function AppRouterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="with-sidebar">
      <aside className="sidebar">
        <h2>Seção App Router</h2>
        <nav>
          <Link href="/app-router">Visão geral</Link>
          <Link href="/app-router/sobre">Sobre</Link>
          <Link href="/app-router/lento">Página lenta (loading.tsx)</Link>
          <Link href="/app-router/erro">Página com erro (error.tsx)</Link>
          <Link href="/app-router/rota-inexistente">
            Rota inexistente (not-found.tsx)
          </Link>
        </nav>
        <p>
          Este menu vem do layout.tsx da pasta app-router e permanece montado
          durante a navegação entre as rotas filhas.
        </p>
        <LayoutCounter />
      </aside>
      <div>{children}</div>
    </div>
  );
}
