import { Link } from "react-router-dom";

interface ConceptCardProps {
  symbol: string;
  name: string;
  description: string;
  slug: string;
  index: number;
}

export function ConceptCard({ symbol, name, description, slug }: ConceptCardProps) {
  return (
    <Link
      to={`/pojmovnik/${slug}`}
      className="group block p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 bg-card/30 hover:bg-card/60 animate-fade-in"
    >
      <div className="flex items-start gap-6">
        <span className="text-4xl font-display text-primary/80 group-hover:text-primary transition-colors">
          {symbol}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
