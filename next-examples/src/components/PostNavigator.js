"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PostNavigator({ posts }) {
  const router = useRouter();
  const [id, setId] = useState(posts[0]?.id ?? "1");

  return (
    <div className="row">
      <select
        className="input"
        value={id}
        onChange={(event) => setId(event.target.value)}
        style={{ maxWidth: "220px" }}
      >
        {posts.map((post) => (
          <option key={post.id} value={post.id}>
            {post.id} — {post.title}
          </option>
        ))}
      </select>
      <button
        className="btn"
        onClick={() => router.push(`/dynamic-routes/${id}`)}
      >
        Ir com router.push
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => router.push("/dynamic-routes/999")}
      >
        Testar notFound()
      </button>
    </div>
  );
}
