export async function loadCorpus<T>(file: string): Promise<T> {
  const response = await fetch(`/canon/${file}`);
  if (!response.ok) {
    throw new Error(`Corpus file not found: ${file} (${response.status})`);
  }
  return (await response.json()) as T;
}

export function renderInline(
  text: string,
  strongClass = "text-foreground",
  emClass = "text-foreground"
): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={strongClass}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className={emClass}>
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
