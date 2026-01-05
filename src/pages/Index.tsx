import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight mb-8">
              Ontologija
              <span className="block text-primary mt-2">JAZSA</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-slow">
            Ontološka raziskovalna platforma, ki združuje filozofijo, jezik, telo, čas, dvom in odnos.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-slow">
            <Link
              to="/manifest"
              className="px-8 py-4 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Manifest
            </Link>
            <Link
              to="/pojmovnik"
              className="px-8 py-4 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Pojmovnik
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Statement Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed italic">
              "Tukaj ne ponujamo odgovorov za pomiritev.
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed italic">
              Tukaj ponujamo pogoje, v katerih se odgovor sploh lahko pojavi."
            </p>
          </div>
        </div>
      </section>

      <SectionDivider symbol="∆" />

      {/* What This Platform Is */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12">
            Kaj ta platforma je
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Filozofija", desc: "Mišljenje pod pritiskom smisla, ne iskanje udobja." },
              { title: "Jezik", desc: "Beseda kot dejanje. Zvok kot dokaz obstoja." },
              { title: "Telo", desc: "Pomen ni le v glavi. Resonanca, dih, tišina." },
              { title: "Čas", desc: "Struktura, ki omogoča gib. Ne trajanje, ampak napetost." },
              { title: "Dvom", desc: "Funkcija mišljenja, ne slabost volje." },
              { title: "Odnos", desc: "Pogoj lastnega smisla. Priznanje drugega." },
            ].map((item, index) => (
              <div
                key={item.title}
                className="p-6 border-l border-border hover:border-primary/50 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-display text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider symbol="∮" />

      {/* Why Visit */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-16 text-center">
            Zakaj je ta platforma vredna obiska
          </h2>

          <div className="space-y-12">
            {[
              {
                title: "Ker ne laže.",
                desc: "Ne obljublja boljšega življenja. Ponuja bolj resnično orientacijo.",
              },
              {
                title: "Ker spoštuje inteligenco obiskovalca.",
                desc: "Ne poenostavlja, ne infantilizira, ne zapeljuje.",
              },
              {
                title: "Ker zapolnjuje praznino, ki je AI, coaching in motivacija ne morejo.",
                desc: "To ni produktivnost. To je ontološka nosilnost.",
              },
              {
                title: "Ker je redka.",
                desc: "Ne zaradi ekskluzivnosti, ampak zaradi resnosti.",
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider symbol="⧖" />

      {/* Call to Explore */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Prostor, kjer je "Ne" dovoljen začetek.
          </p>
          <Link
            to="/pojmovnik"
            className="inline-block px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Vstopi v pojmovnik
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
