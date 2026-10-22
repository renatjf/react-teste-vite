import Link from "next/link";
import { LayoutCounter } from "@/components/LayoutCounter";

export default function AppRouterLayout({ children }) {
  return (
    <div className="with-sidebar">
      <aside className="sidebar">
        <h2>Seção App Router</h2>
        <nav>
          <Link href="/app-router">Visão geral</Link>
          <Link href="/app-router/sobre">Sobre</Link>
          <Link href="/app-router/lento">Página lenta (loading.js)</Link>
          <Link href="/app-router/erro">Página com erro (error.js)</Link>
          <Link href="/app-router/rota-inexistente">
            Rota inexistente (not-found.js)
          </Link>
        </nav>
        <p>
          Este menu vem do layout.js da pasta app-router e permanece montado
          durante a navegação entre as rotas filhas.
        </p>
        <LayoutCounter />
      </aside>
      <div>{children}</div>
    </div>
  );
}
