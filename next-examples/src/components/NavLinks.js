"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app-router", label: "App Router" },
  { href: "/server-client", label: "Server/Client" },
  { href: "/data-fetching", label: "Data Fetching" },
  { href: "/dynamic-routes", label: "Rotas dinâmicas" },
  { href: "/api-routes", label: "API Routes" },
  { href: "/server-actions", label: "Server Actions" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Navegação principal">
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "active" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
