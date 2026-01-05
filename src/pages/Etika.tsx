import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";

const Etika = () => {
  return (
    <Layout>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              Etični okvir
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Eksplicitne zavrnitve. Odgovornost. Priznanje.
            </p>
          </header>

          {/* Content */}
          <div className="animate-fade-in-slow">
            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                Kaj ta platforma zavrača
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Ni manipulacije.",
                    desc: "Jezik je uporabljen za jasnost, ne za prepričevanje. Čustvena manipulacija je izključena.",
                  },
                  {
                    title: "Ni tolažbe brez strukture.",
                    desc: "Uteha, ki ne temelji na razumevanju, je zavrnjena. Struktura pred pomiritvijo.",
                  },
                  {
                    title: "Ni hitrih rešitev.",
                    desc: "Kompleksnost ni napaka—je pogoj resničnega mišljenja. Poenostavljanje je laž.",
                  },
                  {
                    title: "Ni prodaje vere.",
                    desc: "Vera brez slepote. Prepričanje brez dogme. Odprtost brez naivnosti.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 border-l-2 border-destructive/30 bg-card/20"
                  >
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

            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                Kaj etika tukaj pomeni
              </h2>
              <blockquote className="border-l-2 border-primary/50 pl-6 my-8">
                <p className="font-display text-xl text-foreground italic leading-relaxed">
                  Priznanje drugega kot pogoja lastnega smisla.
                </p>
              </blockquote>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Etika ni seznam pravil. Ni moralni kodeks, ki se nalaga od zunaj. 
                Je <em className="text-foreground">nosilnost odnosa</em>—zmožnost, 
                da v drugem prepoznamo pogoj lastnega obstoja.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Brez drugega ni smisla. Brez odnosa ni jaza. 
                Etika je zato ontološka, ne le normativna.
              </p>
            </section>

            <SectionDivider symbol="⊘" />

            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-8">
                Dialogi pod temi pogoji
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Interaktivni pogovori, kjer sistem:
              </p>
              <ul className="space-y-4">
                {[
                  "ne potrjuje ega,",
                  "ne kaznuje dvoma,",
                  "vzdrži kontradikcijo.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                Vsak dialog je <strong className="text-foreground">preizkus nosilnosti misli</strong>, ne test pravilnosti.
              </p>
            </section>

            <SectionDivider symbol="∆" />

            <section>
              <h2 className="font-display text-2xl text-foreground mb-8">
                Odgovornost
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Vsaka beseda nosi posledico. Jezik ni okras—je dejanje. 
                Ta platforma prevzema odgovornost za:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>jasnost izraza,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>doslednost struktur,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>spoštovanje dvoma,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>zavrnitev manipulacije.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Ne prevzema odgovornosti za udobje, saj udobje ni cilj.
              </p>
            </section>
          </div>

          {/* Closing */}
          <footer className="mt-24 pt-12 border-t border-border/50">
            <p className="text-center text-muted-foreground/80 text-sm">
              Etika tukaj ni dodatek. Je fundament.
            </p>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default Etika;
