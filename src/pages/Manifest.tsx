import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";
import { loadCorpus, renderInline } from "@/data/corpus";

interface ManifestSection {
  symbol: string;
  heading: string;
  intro?: string;
  paragraphs?: string[];
  quote?: string[];
  listStyle?: "bullet" | "dash" | "plain";
  items?: string[];
}

interface ManifestData {
  title: string;
  subtitle: string;
  sections: ManifestSection[];
  closing: string[];
}

const bulletClass = "text-primary mt-1";
const dashClass = "text-primary/60 mt-1";

const Manifest = () => {
  const [data, setData] = useState<ManifestData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCorpus<ManifestData>("manifest.json").then(setData).catch((e) => setError(String(e)));
  }, []);

  return (
    <Layout>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              {data?.title ?? "Manifest"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data?.subtitle}
            </p>
          </header>

          {error && (
            <p className="text-sm text-muted-foreground">{error}</p>
          )}

          <div className="animate-fade-in-slow">
            {data?.sections.map((section) => (
              <div key={section.heading}>
                <section className="mb-16">
                  <h2 className="font-display text-2xl text-foreground mb-6">
                    {section.heading}
                  </h2>
                  {section.intro && (
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {renderInline(section.intro)}
                    </p>
                  )}
                  {section.paragraphs?.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                      {renderInline(p)}
                    </p>
                  ))}
                  {section.quote && (
                    <blockquote className="border-l-2 border-primary/50 pl-6 my-8">
                      <p className="font-display text-xl text-foreground italic">
                        {section.quote.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < section.quote!.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </blockquote>
                  )}
                  {section.items && (
                    <ul className="space-y-3 text-muted-foreground">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {section.listStyle === "bullet" && (
                            <span className={bulletClass}>•</span>
                          )}
                          {section.listStyle === "dash" && (
                            <span className={dashClass}>—</span>
                          )}
                          <span>{renderInline(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
                <SectionDivider symbol={section.symbol} />
              </div>
            ))}
          </div>

          <footer className="mt-24 pt-12 border-t border-border/50">
            <blockquote className="font-display text-xl md:text-2xl text-foreground italic text-center">
              {data?.closing.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < data.closing.length - 1 && <br />}
                </span>
              ))}
            </blockquote>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default Manifest;
