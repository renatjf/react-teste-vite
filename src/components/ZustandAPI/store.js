import { create } from "zustand";

const API_BASE =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRmYmQ5Zjk5MjYwNmU3NjNiOWE3YWMzNTAzMzliOCIsIm5iZiI6MTc1MDE2MjE1Ny42ODk5OTk4LCJzdWIiOiI2ODUxNWFlZGI2YjA2MzljNGJiYmQ3NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Wh0InuZ6jJazZYrNn_ZinYSI4Jjs3D_iMRhLLHJbtlI";

export const useFilmesStore = create((set, get) => ({
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
      const data = await response.json();
      set({
        filmes: data.results,
        pagina: 1,
        hasMore: data.page < data.total_pages,
        carregando: false,
      });
    } catch (error) {
      set({ erro: error.message, carregando: false });
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
      const data = await response.json();
      set((state) => ({
        filmes: [...state.filmes, ...data.results],
        pagina: nextPage,
        hasMore: nextPage < data.total_pages,
        carregando: false,
      }));
    } catch (error) {
      set({ erro: error.message, carregando: false });
    }
  },

  selecionarFilme: (filme) => set({ filmeSelecionado: filme }),
  fecharDetalhes: () => set({ filmeSelecionado: null }),
}));
