export default function PostLoading() {
  return (
    <div className="card">
      <div className="row">
        <span className="spinner" aria-hidden="true" />
        <span>Carregando post…</span>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
        Este é o <code>loading.tsx</code> de <code>dynamic-routes/[id]</code>.
      </p>
    </div>
  );
}
