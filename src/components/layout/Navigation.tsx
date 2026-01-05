import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Vstop" },
  { path: "/manifest", label: "Manifest" },
  { path: "/pojmovnik", label: "Pojmovnik" },
  { path: "/etika", label: "Etika" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/30">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display text-lg tracking-wide text-foreground hover:text-primary transition-colors"
        >
          Ontologija JAZSA
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Meni"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-foreground origin-center transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-foreground transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-foreground origin-center transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-border/30 bg-background overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container mx-auto px-6 py-8 flex flex-col gap-6">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-display tracking-wide ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
