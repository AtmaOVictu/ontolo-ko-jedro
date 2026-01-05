export function Footer() {
  return (
    <footer className="border-t border-border/30 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-display text-lg text-foreground">
              Ontologija JAZSA
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Ontološka raziskovalna platforma
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground/60 max-w-md text-right">
            Ta platforma ne obstaja, da bi bila všeč.
            <br />
            Obstaja, da zdrži tiste, ki nočejo več bežati pred pomenom.
          </p>
        </div>
      </div>
    </footer>
  );
}
