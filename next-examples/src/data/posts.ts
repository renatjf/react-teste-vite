export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Introdução ao App Router",
    excerpt:
      "Como o App Router organiza rotas com pastas e arquivos especiais como page.tsx e layout.tsx.",
    content:
      "O App Router substitui o antigo Pages Router. Cada pasta dentro de app representa um segmento de URL, e arquivos como page.tsx, layout.tsx e loading.tsx definem o comportamento daquele segmento. Os componentes são Server Components por padrão.",
  },
  {
    id: "2",
    title: "Server Components na prática",
    excerpt:
      "Entenda por que o padrão do App Router é renderizar no servidor e quando usar 'use client'.",
    content:
      "Server Components executam apenas no servidor, podem ser assíncronos e acessar banco de dados diretamente. Use 'use client' apenas em componentes que precisam de estado, efeitos ou eventos do navegador.",
  },
  {
    id: "3",
    title: "Rotas dinâmicas com [id]",
    excerpt:
      "Como criar segmentos dinâmicos, acessar params assíncronos e gerar metadata por rota.",
    content:
      "Uma pasta com colchetes, como [id], cria um segmento dinâmico. No Next.js atual, params é uma Promise: use await params em Server Components, generateMetadata e Route Handlers.",
  },
  {
    id: "4",
    title: "Navegação com Link e useRouter",
    excerpt:
      "Diferenças entre o componente Link e o hook useRouter para navegar no App Router.",
    content:
      "O componente Link faz prefetch e mantém a navegação client-side. O hook useRouter é útil para navegação programática, como router.push, router.replace e router.back.",
  },
  {
    id: "5",
    title: "Streaming e Suspense",
    excerpt:
      "Como enviar HTML progressivamente e melhorar a percepção de performance.",
    content:
      "O App Router usa streaming por padrão. Com Suspense, partes lentas da interface podem ser renderizadas depois, enquanto o restante da página já está disponível para o usuário.",
  },
];

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}
