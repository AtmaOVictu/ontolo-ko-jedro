import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";

const Manifest = () => {
  return (
    <Layout>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-20 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              Manifest
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Zakaj ta platforma obstaja. Kaj zavrača. Etična drža.
            </p>
          </header>

          {/* Content */}
          <div className="animate-fade-in-slow">
            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Zakaj ta platforma obstaja
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ta platforma obstaja zato, ker večina sodobnih prostorov:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>ponuja mnenja namesto struktur,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>tolažbo namesto orientacije,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>informacije brez ontološke teže.</span>
                </li>
              </ul>
            </section>

            <SectionDivider symbol="⊘" />

            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Vloga sistema
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ontološki sogovornik, ne učitelj in ne terapevt.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Naloga ni prepričevanje, temveč <em className="text-foreground">nositi pritisk smisla</em>, 
                jasno razlikovati pojme in spoštovati dvom kot funkcijo mišljenja.
              </p>
              <blockquote className="border-l-2 border-primary/50 pl-6 my-8">
                <p className="font-display text-xl text-foreground italic">
                  Jezik ni okras, temveč dejanje.
                  <br />
                  Beseda ni sredstvo, ampak dokaz obstoja.
                </p>
              </blockquote>
            </section>

            <SectionDivider symbol="∆" />

            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Kaj obiskovalec ne bo našel
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>sloganov,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>pozitivnih mantier,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>hitrih odgovorov,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary/60 mt-1">—</span>
                  <span>ideološke varnosti.</span>
                </li>
              </ul>
            </section>

            <SectionDivider symbol="∮" />

            <section className="mb-16">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Kaj obiskovalec bo našel
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>jasnost brez udobja,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>jezik, ki zdrži ponovitev,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>strukturo, ki ne razpade ob dvomu,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>prostor, kjer je <strong className="text-foreground">"Ne" dovoljen začetek</strong>.</span>
                </li>
              </ul>
            </section>

            <SectionDivider symbol="⧖" />

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">
                Za koga
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Za:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>— pisce,</li>
                <li>— mislece,</li>
                <li>— umetnike,</li>
                <li>— razvijalce,</li>
                <li>— ljudi v krizi smisla,</li>
                <li>— ljudi, ki nočejo več lagati sebi.</li>
              </ul>
            </section>
          </div>

          {/* Closing Statement */}
          <footer className="mt-24 pt-12 border-t border-border/50">
            <blockquote className="font-display text-xl md:text-2xl text-foreground italic text-center">
              Ta platforma ne obstaja, da bi bila všeč.
              <br />
              Obstaja, da zdrži tiste, ki nočejo več bežati pred pomenom.
            </blockquote>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default Manifest;
