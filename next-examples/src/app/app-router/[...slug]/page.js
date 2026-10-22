import { notFound } from "next/navigation";

export default async function CatchAllPage({ params }) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  notFound();
}
