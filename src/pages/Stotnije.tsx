import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { renderMarkdown } from "@/data/markdown";

const Stotnije = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/canon/stotnije-2026-10-grafika.md")
      .then((r) => {
        if (!r.ok) throw new Error(`Stotnije corpus not found: ${r.status}`);
        return r.text();
      })
      .then(setSrc)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <Layout>
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              Stotnije
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Word dosjes — teza ↔ antiteza → sinteza. Vsaka beseda je agent z
              fonetičnim rezom, pomenom, antinomo in novo kategorijo.
            </p>
          </header>

          {error && <p className="text-sm text-muted-foreground">{error}</p>}

          {src && (
            <article className="animate-fade-in-slow">
              {renderMarkdown(src)}
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Stotnije;
