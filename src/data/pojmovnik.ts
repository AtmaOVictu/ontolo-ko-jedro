export interface Concept {
  slug: string;
  symbol: string;
  name: string;
  description: string;
  function: string;
  tension: string;
  risk: string;
  relation: string;
}

export interface PojmovnikData {
  concepts: Concept[];
}

export async function loadPojmovnik(): Promise<Concept[]> {
  const response = await fetch("/canon/pojmovnik.json");
  if (!response.ok) {
    throw new Error(`Pojmovnik corpus not found: ${response.status}`);
  }
  const data = (await response.json()) as PojmovnikData;
  return data.concepts;
}

export async function loadConcept(slug: string): Promise<Concept | null> {
  const concepts = await loadPojmovnik();
  return concepts.find((concept) => concept.slug === slug) ?? null;
}
