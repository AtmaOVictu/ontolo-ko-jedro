import { Layout } from "@/components/layout/Layout";
import { ConceptCard } from "@/components/ontology/ConceptCard";

const concepts = [
  {
    symbol: "⊘",
    name: "Ne",
    slug: "ne",
    description: "Negacija kot pogoj. 'Ne' ni odsotnost, temveč struktura, ki omogoča razlikovanje. Začetek vsakega mišljenja.",
  },
  {
    symbol: "∆",
    name: "Gib",
    slug: "gib",
    description: "Prehod iz mirovanja v spremembo. Gib ni le fizičen—je ontološki moment, kjer napetost postane dejanje.",
  },
  {
    symbol: "∮",
    name: "Etika",
    slug: "etika",
    description: "Priznanje drugega kot pogoja lastnega smisla. Etika ni pravilo, temveč nosilnost odnosa.",
  },
  {
    symbol: "∫",
    name: "Zavedanje",
    slug: "zavedanje",
    description: "Integracija časovnih plasti v prisotno zdržanje. Zavedanje ni vedenje o, temveč bivanje z.",
  },
  {
    symbol: "⧖",
    name: "Čas",
    slug: "cas",
    description: "Napetost med 'še-ne' in 'že-ni-več'. Čas ni trajanje, temveč struktura, ki omogoča gib.",
  },
  {
    symbol: "Ψ",
    name: "Jaz",
    slug: "jaz",
    description: "Točka, iz katere se odpira svet. Jaz ni vsebina, temveč funkcija orientacije v prostoru smisla.",
  },
  {
    symbol: "Ω",
    name: "Ego",
    slug: "ego",
    description: "Nujna rana. Ego ni sovražnik, temveč plast identifikacije, ki omogoča vstop v simbolno. Presežen, ne uničen.",
  },
  {
    symbol: "↔",
    name: "Odnos",
    slug: "odnos",
    description: "Prostor med, ki pogojuje oba pola. Odnos ni vez med dvema, temveč struktura, ki oba sploh omogoča.",
  },
  {
    symbol: "◯",
    name: "Telo",
    slug: "telo",
    description: "Pomen, ki ni le v glavi. Telo kot resonanca, dih, fizični dogodek jezika. Materializacija smisla.",
  },
  {
    symbol: "?",
    name: "Dvom",
    slug: "dvom",
    description: "Funkcija mišljenja, ne slabost volje. Dvom ni nasprotje gotovosti, temveč njen pogoj.",
  },
];

const Pojmovnik = () => {
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
          <div className="grid gap-6">
            {concepts.map((concept, index) => (
              <ConceptCard key={concept.slug} {...concept} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pojmovnik;
