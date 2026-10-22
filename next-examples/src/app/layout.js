import Link from "next/link";
import "./globals.css";
import { NavLinks } from "@/components/NavLinks";

export const metadata = {
  title: {
    default: "Next.js Exemplos",
    template: "%s | Next.js Exemplos",
  },
  description: "Exemplos práticos dos principais recursos do Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Next.js Exemplos
          </Link>
          <NavLinks />
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          Exemplos de Next.js App Router — criados para estudo.
        </footer>
      </body>
    </html>
  );
}
