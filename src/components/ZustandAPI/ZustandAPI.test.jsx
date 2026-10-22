import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ZustandAPI } from "./ZustandAPI";
import { useFilmesStore } from "./store";

const mockFilmes = [
  {
    id: 1,
    title: "Filme Teste 1",
    poster_path: "/teste1.jpg",
    backdrop_path: "/backdrop1.jpg",
    vote_average: 8.5,
    release_date: "2024-01-01",
    overview: "Descricao do filme 1",
  },
  {
    id: 2,
    title: "Filme Teste 2",
    poster_path: "/teste2.jpg",
    backdrop_path: null,
    vote_average: 7.2,
    release_date: "2024-06-15",
    overview: "",
  },
];

describe("Filmes Store", () => {
  beforeEach(() => {
    useFilmesStore.setState({
      filmes: [],
      pagina: 1,
      hasMore: true,
      carregando: false,
      erro: null,
      filmeSelecionado: null,
    });
  });

  it("inicia com estado vazio", () => {
    const state = useFilmesStore.getState();
    expect(state.filmes).toEqual([]);
    expect(state.pagina).toBe(1);
    expect(state.hasMore).toBe(true);
    expect(state.carregando).toBe(false);
    expect(state.erro).toBeNull();
    expect(state.filmeSelecionado).toBeNull();
  });

  it("busca filmes com sucesso e atualiza o store", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: mockFilmes, page: 1, total_pages: 5 }),
      })
    );

    await useFilmesStore.getState().buscarFilmes();
    const state = useFilmesStore.getState();

    expect(state.filmes).toHaveLength(2);
    expect(state.filmes[0].title).toBe("Filme Teste 1");
    expect(state.carregando).toBe(false);
    expect(state.erro).toBeNull();
    expect(state.hasMore).toBe(true);

    vi.restoreAllMocks();
  });

  it("carrega mais filmes na pagina 2", async () => {
    useFilmesStore.setState({ filmes: mockFilmes, pagina: 1, hasMore: true });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [{ id: 3, title: "Filme Teste 3", poster_path: "/teste3.jpg" }],
            page: 2,
            total_pages: 5,
          }),
      })
    );

    await useFilmesStore.getState().buscarMaisFilmes();
    const state = useFilmesStore.getState();

    expect(state.filmes).toHaveLength(3);
    expect(state.filmes[2].title).toBe("Filme Teste 3");
    expect(state.pagina).toBe(2);
    expect(state.hasMore).toBe(true);

    vi.restoreAllMocks();
  });

  it("nao busca mais quando hasMore e false", async () => {
    useFilmesStore.setState({ hasMore: false });

    await useFilmesStore.getState().buscarMaisFilmes();
    const state = useFilmesStore.getState();

    expect(state.filmes).toEqual([]);
    expect(state.carregando).toBe(false);

    vi.restoreAllMocks();
  });

  it("trata erro na requisicao", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await useFilmesStore.getState().buscarFilmes();
    const state = useFilmesStore.getState();

    expect(state.filmes).toEqual([]);
    expect(state.erro).toBe("Erro ao buscar filmes");
    expect(state.carregando).toBe(false);

    vi.restoreAllMocks();
  });

  it("seleciona e fecha detalhes do filme", () => {
    const { selecionarFilme, fecharDetalhes } = useFilmesStore.getState();

    selecionarFilme(mockFilmes[0]);
    expect(useFilmesStore.getState().filmeSelecionado).toEqual(mockFilmes[0]);

    fecharDetalhes();
    expect(useFilmesStore.getState().filmeSelecionado).toBeNull();
  });
});

describe("ZustandAPI Component", () => {
  beforeEach(() => {
    useFilmesStore.setState({
      filmes: [],
      pagina: 1,
      hasMore: true,
      carregando: false,
      erro: null,
      filmeSelecionado: null,
    });
  });

  it("exibe 'Carregando mais filmes...' durante busca", () => {
    useFilmesStore.setState({ carregando: true });

    render(<ZustandAPI />);
    expect(screen.getByTestId("carregando-mais")).toBeInTheDocument();
  });

  it("renderiza a lista de filmes apos busca", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: mockFilmes, page: 1, total_pages: 2 }),
      })
    );

    render(<ZustandAPI />);

    await waitFor(() => {
      expect(screen.getByText("Filme Teste 1")).toBeInTheDocument();
    });
    expect(screen.getByText("Filme Teste 2")).toBeInTheDocument();
    expect(screen.getAllByTestId("filme-card")).toHaveLength(2);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);

    vi.restoreAllMocks();
  });

  it("exibe erro quando a requisicao falha", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ZustandAPI />);

    await waitFor(() => {
      expect(screen.getByText("Erro: Erro ao buscar filmes")).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it("abre modal ao clicar no filme", async () => {
    useFilmesStore.setState({ filmes: mockFilmes });

    render(<ZustandAPI />);

    fireEvent.click(screen.getAllByTestId("filme-card")[0]);

    expect(screen.getByTestId("modal-detalhes")).toBeInTheDocument();
    expect(screen.getAllByText("Filme Teste 1").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Descricao do filme 1/)).toBeInTheDocument();
  });

  it("fecha modal ao clicar no botao fechar", async () => {
    useFilmesStore.setState({ filmes: mockFilmes });

    render(<ZustandAPI />);

    fireEvent.click(screen.getAllByTestId("filme-card")[0]);
    expect(screen.getByTestId("modal-detalhes")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("fechar-modal"));
    expect(screen.queryByTestId("modal-detalhes")).not.toBeInTheDocument();
  });

});
