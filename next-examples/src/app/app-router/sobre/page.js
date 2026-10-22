export const metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  return (
    <div>
      <h1>Sobre esta seção</h1>
      <p>
        Esta página está em <code>app-router/sobre/page.js</code> e herda
        automaticamente o layout de <code>app-router/layout.js</code> e o layout
        raiz.
      </p>
      <div className="ok">
        A URL é <code>/app-router/sobre</code>, mas o layout aninhado continua
        visível. Nenhum estado do menu lateral foi perdido na navegação.
      </div>
      <section className="card">
        <h2>Layouts se aninham</h2>
        <p>
          A hierarquia de layouts é composta: layout raiz → layout de
          app-router → page. Cada layout recebe <code>children</code> e pode
          adicionar sua própria estrutura.
        </p>
      </section>
    </div>
  );
}
