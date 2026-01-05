interface SectionDividerProps {
  symbol?: string;
}

export function SectionDivider({ symbol = "⊘" }: SectionDividerProps) {
  return (
    <div className="py-16 flex items-center justify-center">
      <div className="flex items-center gap-8 animate-fade-in-slow">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-border" />
        <span className="text-2xl text-primary/60">{symbol}</span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-border" />
      </div>
    </div>
  );
}
