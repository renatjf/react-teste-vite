import { create } from "zustand";

const API_BASE =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRmYmQ5Zjk5MjYwNmU3NjNiOWE3YWMzNTAzMzliOCIsIm5iZiI6MTc1MDE2MjE1Ny42ODk5OTk4LCJzdWIiOiI2ODUxNWFlZGI2YjA2MzljNGJiYmQ3NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Wh0InuZ6jJazZYrNn_ZinYSI4Jjs3D_iMRhLLHJbtlI";

export interface Filme {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface TmdbResponse {
  results: Filme[];
  page: number;
  total_pages: number;
}

interface FilmesState {
  filmes: Filme[];
  pagina: number;
  hasMore: boolean;
  carregando: boolean;
  erro: string | null;
  filmeSelecionado: Filme | null;
  buscarFilmes: () => Promise<void>;
  buscarMaisFilmes: () => Promise<void>;
  selecionarFilme: (filme: Filme) => void;
  fecharDetalhes: () => void;
}

export const useFilmesStore = create<FilmesState>((set, get) => ({
  filmes: [],
  pagina: 1,
  hasMore: true,
  carregando: false,
  erro: null,
  filmeSelecionado: null,

  buscarFilmes: async () => {
    set({ carregando: true, erro: null });
    try {
      const response = await fetch(`${API_BASE}&page=1`, {
        headers: { Authorization: TOKEN },
      });
      if (!response.ok) throw new Error("Erro ao buscar filmes");
      const data = (await response.json()) as TmdbResponse;
      set({
        filmes: data.results,
        pagina: 1,
        hasMore: data.page < data.total_pages,
        carregando: false,
      });
    } catch (error) {
      set({
        erro: error instanceof Error ? error.message : "Erro ao buscar filmes",
        carregando: false,
      });
    }
  },

  buscarMaisFilmes: async () => {
    const { pagina, hasMore, carregando } = get();
    if (carregando || !hasMore) return;
    const nextPage = pagina + 1;
    set({ carregando: true });
    try {
      const response = await fetch(`${API_BASE}&page=${nextPage}`, {
        headers: { Authorization: TOKEN },
      });
      if (!response.ok) throw new Error("Erro ao buscar mais filmes");
      const data = (await response.json()) as TmdbResponse;
      set((state) => ({
        filmes: [...state.filmes, ...data.results],
        pagina: nextPage,
        hasMore: nextPage < data.total_pages,
        carregando: false,
      }));
    } catch (error) {
      set({
        erro:
          error instanceof Error ? error.message : "Erro ao buscar mais filmes",
        carregando: false,
      });
    }
  },

  selecionarFilme: (filme) => set({ filmeSelecionado: filme }),
  fecharDetalhes: () => set({ filmeSelecionado: null }),
}));
