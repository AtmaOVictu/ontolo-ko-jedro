import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";
import { loadCorpus, renderInline } from "@/data/corpus";

interface EtikaData {
  title: string;
  subtitle: string;
  rejections: { title: string; desc: string }[];
  meaning: { quote: string; paragraphs: string[] };
  dialogues: { heading: string; intro: string; items: string[]; outro: string };
  responsibility: { heading: string; intro: string; items: string[]; outro: string };
  closing: string;
}

const Etika = () => {
  const [data, setData] = useState<EtikaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCorpus<EtikaData>("etika.json").then(setData).catch((e) => setError(String(e)));
  }, []);

  return (
    <Layout>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              {data?.title ?? "Etični okvir"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data?.subtitle}
            </p>
          </header>

          {error && <p className="text-sm text-muted-foreground">{error}</p>}

          <div className="animate-fade-in-slow">
            {/* Rejections */}
            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                Kaj ta platforma zavrača
              </h2>
              <div className="space-y-6">
                {data?.rejections.map((item, index) => (
                  <div key={index} className="p-6 border-l-2 border-destructive/30 bg-card/20">
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <SectionDivider symbol="∮" />

            {/* Meaning */}
            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                Kaj etika tukaj pomeni
              </h2>
              <blockquote className="border-l-2 border-primary/50 pl-6 my-8">
                <p className="font-display text-xl text-foreground italic leading-relaxed">
                  {data?.meaning.quote}
                </p>
              </blockquote>
              {data?.meaning.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                  {renderInline(p)}
                </p>
              ))}
            </section>

            <SectionDivider symbol="⊘" />

            {/* Dialogues */}
            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                {data?.dialogues.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data?.dialogues.intro}
              </p>
              <ul className="space-y-4">
                {data?.dialogues.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                {data && renderInline(data.dialogues.outro)}
              </p>
            </section>

            <SectionDivider symbol="∆" />

            {/* Responsibility */}
            <section>
              <h2 className="font-display text-2xl text-foreground mb-8">
                {data?.responsibility.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data?.responsibility.intro}
              </p>
              <ul className="space-y-3 text-muted-foreground mb-8">
                {data?.responsibility.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary/60 mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                {data?.responsibility.outro}
              </p>
            </section>
          </div>

          <footer className="mt-24 pt-12 border-t border-border/50">
            <p className="text-center text-muted-foreground/80 text-sm">
              {data?.closing}
            </p>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default Etika;
