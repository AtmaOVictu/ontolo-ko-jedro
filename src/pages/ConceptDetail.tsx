import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionDivider } from "@/components/ontology/SectionDivider";
import { ArrowLeft } from "lucide-react";

const conceptsData: Record<string, {
  symbol: string;
  name: string;
  description: string;
  function: string;
  tension: string;
  risk: string;
  relation: string;
}> = {
  ne: {
    symbol: "⊘",
    name: "Ne",
    description: "Negacija kot pogoj. 'Ne' ni odsotnost, temveč struktura, ki omogoča razlikovanje.",
    function: "Vzpostavlja mejo. Brez 'ne' ni notranjega in zunanjega, ni izbire, ni smisla. 'Ne' je prvi rez v kaos nediferencirane celote.",
    tension: "'Ne' razpira prostor med tem, kar je, in tem, kar ni. V tej napetosti se rojeva možnost—možnost, da nekaj je namesto da ni.",
    risk: "Absolutizacija negacije. Ko 'ne' postane edina gesta, se sprevrže v nihilizem. 'Ne' brez 'da' je jalovost.",
    relation: "Pogojuje 'da'. Brez zavrnitve ni sprejema. Brez meje ni forme. 'Ne' je ontološki pogoj vsakega 'da'.",
  },
  gib: {
    symbol: "∆",
    name: "Gib",
    description: "Prehod iz mirovanja v spremembo. Gib ni le fizičen—je ontološki moment.",
    function: "Aktualizira napetost. Gib je tisti moment, ko potencial postane dejanje, ko struktura spregovori v svetu.",
    tension: "Med mirovanjem in premikom. Gib nosi napetost odločitve—trenutek, ko se možnosti sesedejo v eno dejanje.",
    risk: "Nepremišljen gib. Gib brez orientacije je slepa sila. Premišljen gib brez dejanja je jalovost volje.",
    relation: "Pogojuje čas in prostor. Brez giba ni 'prej' in 'potem'. Gib je časovni rez, ki vzpostavlja sekvenco.",
  },
  etika: {
    symbol: "∮",
    name: "Etika",
    description: "Priznanje drugega kot pogoja lastnega smisla. Etika ni pravilo, temveč nosilnost odnosa.",
    function: "Vzpostavlja prostor med. Etika ni vsebina, temveč struktura, ki omogoča, da se srečanje sploh zgodi.",
    tension: "Med lastnim in tujim. Etika je napetost, ki ne razrešuje, temveč vzdržuje prostor, v katerem drugi ostane drugi.",
    risk: "Moralizem. Ko etika postane pravilo namesto odnosa, se sprevrže v oblast moči. Etika brez dvoma je dominacija.",
    relation: "Pogojuje vsak resnični odnos. Brez etike je drugi le objekt ali ovira. Etika je pogoj, da drugi sploh je drugi.",
  },
  zavedanje: {
    symbol: "∫",
    name: "Zavedanje",
    description: "Integracija časovnih plasti v prisotno zdržanje. Zavedanje ni vedenje o, temveč bivanje z.",
    function: "Integrira sedanjost. Zavedanje zbira preteklo in prihodnje v točko prisotnosti, ki ni le trenutek, temveč gostota.",
    tension: "Med pozornostjo in razpršenostjo. Zavedanje je napor—nenehno vračanje k temu, kar je tukaj, zdaj.",
    risk: "Narcisizem zavedanja. Ko zavedanje postane objekt samo sebi, izgubi svet. Zavedanje brez sveta je prazna zanka.",
    relation: "Pogojuje pomen. Brez zavedanja ni pomena—stvari so, a niso za nikogar. Zavedanje je tisto 'za', ki osmisli.",
  },
  cas: {
    symbol: "⧖",
    name: "Čas",
    description: "Napetost med 'še-ne' in 'že-ni-več'. Čas ni trajanje, temveč struktura, ki omogoča gib.",
    function: "Omogoča sekvenco. Čas ni vsebina, temveč forma, v kateri se dogodek sploh lahko zgodi kot dogodek.",
    tension: "Med preteklim in prihodnjim. Sedanjost je le točka napetosti, kjer se preteklo in prihodnje srečata v dejanju.",
    risk: "Pozaba časovnosti. Ko čas postane le objektivna mera, izgubi svojo ontološko vlogo. Čas brez napetosti je mrtev čas.",
    relation: "Pogojuje gib in spremembo. Brez časa ni 'prej' in 'potem', ni procesa, ni razvoja, ni življenja.",
  },
  jaz: {
    symbol: "Ψ",
    name: "Jaz",
    description: "Točka, iz katere se odpira svet. Jaz ni vsebina, temveč funkcija orientacije.",
    function: "Orientira. Jaz ni stvar, ki bi jo lahko našli—je gesta, iz katere se svet odpira kot svet. Izvor perspektive.",
    tension: "Med seboj in svetom. Jaz ni samozadosten—obstaja le v odnosu do drugega, do sveta, do ne-jaza.",
    risk: "Narcisizem. Ko jaz postane center sveta namesto njegova odprtost, se zapre. Jaz, ki je le zase, ni jaz.",
    relation: "Pogojuje perspektivo in odnos. Brez jaza ni 'od tukaj'. Jaz je pogoj, da se svet sploh kaže.",
  },
  ego: {
    symbol: "Ω",
    name: "Ego",
    description: "Nujna rana. Ego ni sovražnik, temveč plast identifikacije, ki omogoča vstop v simbolno.",
    function: "Vzpostavlja identiteto. Ego je tista plast, ki omogoča, da 'jaz' postane prepoznaven—sebi in drugim.",
    tension: "Med identiteto in odprtostjo. Ego je hkrati nujen in omejitvujoč—brez njega ni vstopa v simbolno, z njim pa grozi zaprtost.",
    risk: "Identifikacija z egom. Ko ego postane vse, kar jaz je, se jaz reducira. Ego kot gospodar namesto kot orodje.",
    relation: "Pogojuje simbolni vstop. Brez ega ni imena, ni prepoznavnosti, ni mesta v svetu. A ego mora biti presežen, ne uničen.",
  },
  odnos: {
    symbol: "↔",
    name: "Odnos",
    description: "Prostor med, ki pogojuje oba pola. Odnos ni vez med dvema, temveč struktura, ki oba sploh omogoča.",
    function: "Konstituira. Odnos ni sekundaren—ni nekaj, kar nastane med že obstoječima. Odnos je primaren, pola sta sekundarna.",
    tension: "Med bližino in distanco. Odnos mora vzdržati napetost, ne da bi jo razrešil. Pretirana bližina uniči, pretirana distanca razveže.",
    risk: "Posesivnost ali indiferenca. Ko odnos postane posest, ni več odnosa—je apropriacija. Ko je indiferenca, tudi ni odnosa.",
    relation: "Pogojuje jaz in drugega. Brez odnosa ni jaza kot jaza, ni drugega kot drugega. Odnos je ontološka matrica.",
  },
  telo: {
    symbol: "◯",
    name: "Telo",
    description: "Pomen, ki ni le v glavi. Telo kot resonanca, dih, fizični dogodek jezika.",
    function: "Materializira. Telo ni ovira duhu—je njegov medij. V telesu se pomen zgodi kot dogodek, ne le kot ideja.",
    tension: "Med mislijo in materijo. Telo je napetost, kjer se abstraktno sreča s konkretnim, kjer ideja postane gesta.",
    risk: "Dualizem. Ko telo postane 'le telo', ločeno od smisla, se izgubi ontološka celota. Telo brez duha je truplo, duh brez telesa je fantom.",
    relation: "Pogojuje prisotnost. Brez telesa ni 'tukaj'. Telo je kraj, kjer se jaz sploh nahaja v svetu.",
  },
  dvom: {
    symbol: "?",
    name: "Dvom",
    description: "Funkcija mišljenja, ne slabost volje. Dvom ni nasprotje gotovosti, temveč njen pogoj.",
    function: "Prečiščuje. Dvom ni destruktiven—je selektiven. Odstranjuje tisto, kar ne vzdrži preizkusa, in pušča tisto, kar zdrži.",
    tension: "Med gotovostjo in negotovostjo. Dvom vzdržuje napetost med 'vem' in 'ne vem'—v tej napetosti se rodi resnično vedenje.",
    risk: "Paralizirajoči dvom. Ko dvom postane neskončen, postane impotenten. Dvom, ki nikoli ne doseže dna, je beg pred odločitvijo.",
    relation: "Pogojuje mišljenje. Brez dvoma ni mišljenja—je le ponavljanje. Dvom je tisti 'rez', ki omogoča nov pogled.",
  },
};

const ConceptDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const concept = slug ? conceptsData[slug] : null;

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
