import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";
import { ArrowLeft } from "lucide-react";
import { loadConcept, type Concept } from "@/data/pojmovnik";

const ConceptDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setConcept(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    loadConcept(slug)
      .then(setConcept)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="py-24 px-6 text-center text-muted-foreground">
          ⊘
        </div>
      </Layout>
    );
  }

  if (!concept) {
    return (
      <Layout>
        <div className="py-24 px-6 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Pojem ni najden
          </h1>
          <Link to="/pojmovnik" className="text-primary hover:underline">
            Nazaj na pojmovnik
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <div className="mb-12">
            <Link
              to="/pojmovnik"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Pojmovnik
            </Link>
          </div>

          {/* Header */}
          <header className="mb-16 animate-fade-in">
            <div className="flex items-center gap-6 mb-6">
              <span className="text-6xl md:text-7xl text-primary/80">{concept.symbol}</span>
              <h1 className="font-display text-5xl md:text-6xl text-foreground">
                {concept.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {concept.description}
            </p>
          </header>

          {/* Content Sections */}
          <div className="animate-fade-in-slow">
            <section className="mb-12">
              <h2 className="font-display text-xl text-primary mb-4">
                Funkcija
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {concept.function}
              </p>
            </section>

            <SectionDivider symbol={concept.symbol} />

            <section className="mb-12">
              <h2 className="font-display text-xl text-primary mb-4">
                Napetost
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {concept.tension}
              </p>
            </section>

            <SectionDivider symbol="⊘" />

            <section className="mb-12">
              <h2 className="font-display text-xl text-primary mb-4">
                Tveganje
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {concept.risk}
              </p>
            </section>

            <SectionDivider symbol="↔" />

            <section className="mb-12">
              <h2 className="font-display text-xl text-primary mb-4">
                Odnos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {concept.relation}
              </p>
            </section>
          </div>

          {/* Navigation */}
          <footer className="mt-16 pt-8 border-t border-border/50">
            <Link
              to="/pojmovnik"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Nazaj na vse pojme
            </Link>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default ConceptDetail;
