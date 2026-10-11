import type { ReactNode } from "react";

export function renderMarkdown(src: string): ReactNode[] {
  const lines = src.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const inline = (text: string): ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={j}>{part.slice(1, -1)}</em>;
      }
      return part;
    });

  const isTableRow = (l: string) => /^\|.*\|/.test(l.trim());
  const isTableSep = (l: string) => /^\|[\s:|-]+\|$/.test(l.trim());

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "" || trimmed === "---") {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      out.push(
        <h3 key={key++} className="font-display text-lg text-primary mt-10 mb-4">{inline(trimmed.slice(4))}</h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      out.push(
        <h2 key={key++} className="font-display text-2xl text-foreground mt-14 mb-6">{inline(trimmed.slice(3))}</h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      out.push(
        <h1 key={key++} className="font-display text-4xl text-foreground mt-14 mb-6">{inline(trimmed.slice(2))}</h1>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(
        <blockquote key={key++} className="border-l-2 border-primary/50 pl-6 my-6 text-muted-foreground italic leading-relaxed">
          {quoteLines.map((q, j) => <p key={j}>{inline(q)}</p>)}
        </blockquote>
      );
      continue;
    }

    if (isTableRow(trimmed) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const header = trimmed.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(lines[i].trim().split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push(
        <div key={key++} className="overflow-x-auto my-6 border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-card/40">
                {header.map((h, j) => (
                  <th key={j} className="px-4 py-3 text-left font-display text-primary">{inline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-border/30 last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 text-muted-foreground align-top">{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(
        <ul key={key++} className="space-y-3 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
              <span className="text-primary mt-1">∴</span>
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const paraLines: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      lines[i].trim() !== "---" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("- ") &&
      !isTableRow(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    out.push(
      <p key={key++} className="text-muted-foreground leading-relaxed my-4">
        {inline(paraLines.join(" "))}
      </p>
    );
  }

  return out;
}
