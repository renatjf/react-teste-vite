import { useEffect, useRef, useCallback, useState } from "react";
import { useFilmesStore } from "./store";
import type { Filme } from "./store";

interface PosterImageProps {
  src: string;
  alt: string;
}

function PosterImage({ src, alt }: PosterImageProps) {
  const [carregando, setCarregando] = useState(true);

  return (
    <>
      {carregando && (
        <div
          data-testid="skeleton"
          style={{
            width: "100%",
            aspectRatio: "2/3",
            background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", display: carregando ? "none" : "block" }}
        onLoad={() => setCarregando(false)}
      />
    </>
  );
}

export function ZustandAPI() {
  const {
    filmes,
    carregando,
    erro,
    hasMore,
    filmeSelecionado,
    buscarFilmes,
    buscarMaisFilmes,
    selecionarFilme,
    fecharDetalhes,
  } = useFilmesStore();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buscarFilmes();
  }, [buscarFilmes]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !carregando) {
        buscarMaisFilmes();
      }
    },
    [hasMore, carregando, buscarMaisFilmes]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <h1>Zustand API</h1>
      <p>Filmes populares via TMDB API com Zustand</p>

      {erro && <p>Erro: {erro}</p>}

      <div data-testid="lista-filmes" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filmes.map((filme: Filme) => (
          <div
            key={filme.id}
            data-testid="filme-card"
            onClick={() => selecionarFilme(filme)}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {filme.poster_path && (
              <PosterImage
                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                alt={filme.title}
              />
            )}
            <div style={{ padding: "8px" }}>
              <h3 style={{ fontSize: "14px", margin: "0 0 4px" }}>{filme.title}</h3>
              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                Nota: {filme.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div ref={sentinelRef} data-testid="sentinel" style={{ height: "1px" }} />

      {carregando && <p data-testid="carregando-mais">Carregando mais filmes...</p>}

      {!hasMore && filmes.length > 0 && <p>Nao ha mais filmes para carregar.</p>}

      {filmeSelecionado && (
        <div
          data-testid="modal-detalhes"
          onClick={fecharDetalhes}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              overflow: "hidden",
            }}
          >
            {filmeSelecionado.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${filmeSelecionado.backdrop_path}`}
                alt={filmeSelecionado.title}
                style={{ width: "100%", display: "block" }}
              />
            )}
            <div style={{ padding: "16px" }}>
              <h2 style={{ margin: "0 0 8px" }}>{filmeSelecionado.title}</h2>
              <p style={{ fontSize: "14px", color: "#666", margin: "0 0 4px" }}>
                Nota: {filmeSelecionado.vote_average} | Data:{" "}
                {filmeSelecionado.release_date}
              </p>
              <p style={{ fontSize: "14px", margin: "8px 0 0" }}>
                {filmeSelecionado.overview || "Sem descricao disponivel."}
              </p>
              <button
                data-testid="fechar-modal"
                onClick={fecharDetalhes}
                style={{ marginTop: "12px", padding: "8px 16px", cursor: "pointer" }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
