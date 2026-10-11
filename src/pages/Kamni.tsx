import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { renderMarkdown } from "@/data/markdown";

interface Stone {
  id: string;
  title: string;
  body: string;
}

function parseStones(src: string): { intro: string; stones: Stone[] } {
  const lines = src.split("\n");
  const introLines: string[] = [];
  const stones: Stone[] = [];
  let current: Stone | null = null;
  let inStones = false;

  for (const line of lines) {
    if (line.startsWith("## 🔥")) {
      inStones = true;
      if (current) stones.push(current);
      const title = line.replace("## 🔥", "").trim();
      const idMatch = title.match(/Kamen\s+([A-Z]+)/);
      current = { id: idMatch ? idMatch[1] : String(stones.length), title, body: "" };
      continue;
    }
    if (inStones && current) {
      current.body += line + "\n";
    } else if (!inStones) {
      introLines.push(line);
    }
  }
  if (current) stones.push(current);
  return { intro: introLines.join("\n"), stones };
}

const Kamni = () => {
  const [data, setData] = useState<{ intro: string; stones: Stone[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/canon/kamni/cxvii-cxxi.md")
      .then((r) => {
        if (!r.ok) throw new Error(`Kamni corpus not found: ${r.status}`);
        return r.text();
      })
      .then((text) => setData(parseStones(text)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <Layout>
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              Rozetni kamni
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Preseki tradicij na ∅/∆ ogrodje. Vsak kamen je rez skozi tri pisave
              — zgodovino, simbol, topologijo.
            </p>
          </header>

          {error && <p className="text-sm text-muted-foreground">{error}</p>}

          {data && (
            <>
              <div className="mb-16 text-sm text-muted-foreground/80 leading-relaxed border-l-2 border-border pl-6">
                {renderMarkdown(data.intro)}
              </div>

              <div className="grid gap-6">
                {data.stones.map((stone) => (
                  <article
                    key={stone.id}
                    className="p-8 border border-border/50 bg-card/30 animate-fade-in"
                  >
                    <h2 className="font-display text-xl text-primary mb-6">
                      🔥 {stone.title.replace("⚠", "").trim()}
                    </h2>
                    {renderMarkdown(stone.body)}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Kamni;
