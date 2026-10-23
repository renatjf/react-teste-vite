"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { ApiPost } from "@/lib/api-posts";

interface HelloResponse {
  message: string;
  method: string;
  timestamp: string;
}

interface RequestStatus {
  ok: boolean;
  status: number | "erro";
  data: unknown;
}

export default function ApiRoutesPage() {
  const [hello, setHello] = useState<HelloResponse | null>(null);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [postId, setPostId] = useState("1");
  const [singlePost, setSinglePost] = useState<ApiPost | null>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const [loading, setLoading] = useState(false);

  async function runRequest<T>(url: string, options?: RequestInit) {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(url, options);
      const data = (await response.json()) as T;

      setStatus({ ok: response.ok, status: response.status, data });
      return { response, data };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      setStatus({ ok: false, status: "erro", data: { error: message } });
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function loadHello() {
    const result = await runRequest<HelloResponse>("/api/hello");
    if (result) setHello(result.data);
  }

  async function loadPosts() {
    const result = await runRequest<ApiPost[]>("/api/posts");
    if (result?.response.ok) setPosts(result.data);
  }

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await runRequest<ApiPost>("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (result?.response.ok) {
      setTitle("");
      setPosts((current) => [...current, result.data]);
    }
  }

  async function loadSinglePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await runRequest<ApiPost>(`/api/posts/${postId}`);
    setSinglePost(result?.response.ok ? result.data : null);
  }

  return (
    <div>
      <h1>Route Handlers (API)</h1>
      <p>
        Route Handlers são funções exportadas de arquivos{" "}
        <code>route.ts</code> dentro de <code>app/api</code>. Elas substituem as
        API Routes do Pages Router e usam a mesma estrutura de pastas do App
        Router.
      </p>

      <section className="card">
        <h2>Estrutura</h2>
        <pre className="code">
          <code>{`src/app/api/
├── hello/route.ts        # GET /api/hello
└── posts/
    ├── route.ts          # GET e POST /api/posts
    └── [id]/route.ts     # GET /api/posts/:id`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Exemplo 1 — GET /api/hello</h2>
        <p>
          Um handler simples que retorna JSON. O arquivo exporta a função{" "}
          <code>GET</code>.
        </p>
        <button className="btn" onClick={loadHello} disabled={loading}>
          Chamar /api/hello
        </button>
        {hello && (
          <pre className="result">{JSON.stringify(hello, null, 2)}</pre>
        )}
      </section>

      <section className="card">
        <h2>Exemplo 2 — GET e POST /api/posts</h2>
        <p>
          O mesmo arquivo exporta <code>GET</code> e <code>POST</code>. O POST
          lê o corpo com <code>request.json()</code> e devolve status 201.
        </p>
        <div className="row" style={{ marginBottom: "0.75rem" }}>
          <button className="btn btn-secondary" onClick={loadPosts} disabled={loading}>
            Carregar posts
          </button>
        </div>
        <form onSubmit={createPost} className="row">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título do novo post"
          />
          <button className="btn" type="submit" disabled={loading || !title.trim()}>
            POST /api/posts
          </button>
        </form>
        {posts.length > 0 && (
          <ul className="list" style={{ marginTop: "0.75rem" }}>
            {posts.map((post) => (
              <li key={post.id}>
                <span>{post.title}</span>
                <small style={{ color: "var(--muted)" }}>id: {post.id}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Exemplo 3 — rota dinâmica /api/posts/[id]</h2>
        <p>
          Em Route Handlers, <code>params</code> também é assíncrono:{" "}
          <code>const {"{ id }"} = await params</code>.
        </p>
        <form onSubmit={loadSinglePost} className="row">
          <select
            className="input"
            value={postId}
            onChange={(event) => setPostId(event.target.value)}
            style={{ maxWidth: "120px" }}
          >
            {[1, 2, 3, 999].map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <button className="btn" type="submit" disabled={loading}>
            GET /api/posts/{postId}
          </button>
        </form>
        {singlePost && (
          <pre className="result">{JSON.stringify(singlePost, null, 2)}</pre>
        )}
      </section>

      <section className="card">
        <h2>Última resposta</h2>
        <p>
          Status: <strong>{status ? status.status : "—"}</strong>
        </p>
        <pre className="result">
          {status ? JSON.stringify(status.data, null, 2) : "Nenhuma requisição ainda."}
        </pre>
        <div className="hint">
          O armazenamento dos posts é em memória no servidor. Reiniciar o
          processo do Next.js zera os posts criados via POST.
        </div>
      </section>
    </div>
  );
}
