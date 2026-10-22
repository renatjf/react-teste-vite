export default function AppRouterLoading() {
  return (
    <div className="card">
      <div className="row">
        <span className="spinner" aria-hidden="true" />
        <div>
          <h2 style={{ margin: 0 }}>Carregando…</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Este conteúdo vem do arquivo <code>loading.js</code> do segmento
            app-router.
          </p>
        </div>
      </div>
    </div>
  );
}
