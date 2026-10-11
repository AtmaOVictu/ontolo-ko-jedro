import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ConceptCard } from "@/components/ontology/ConceptCard";
import { loadPojmovnik, type Concept } from "@/data/pojmovnik";

const Pojmovnik = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPojmovnik().then(setConcepts).catch((err) => setError(String(err)));
  }, []);

  return (
    <Layout>
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              Pojmovnik
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Ne slovar. Vsak pojem vsebuje funkcijo, napetost, tveganje in odnos. 
              Žive strukture, ne mrtve definicije.
            </p>
          </header>

          {/* Explanation */}
          <div className="mb-16 p-8 border border-border/50 bg-card/20 animate-fade-in-slow">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vsak pojem je obravnavan kot <strong className="text-foreground">dinamična struktura</strong>. 
              Simboli niso dekoracija—so kondenzacija pomena. 
              Paradoks ni napaka, temveč motor mišljenja.
            </p>
          </div>

          {/* Concepts Grid */}
          {error ? (
            <p className="text-sm text-muted-foreground">{error}</p>
          ) : (
            <div className="grid gap-6">
              {concepts.map((concept, index) => (
                <ConceptCard key={concept.slug} {...concept} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Pojmovnik;
