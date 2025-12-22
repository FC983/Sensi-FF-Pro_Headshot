import { Link } from "wouter";
import { Crosshair } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/20 border border-primary/50 flex items-center justify-center rounded-sm group-hover:bg-primary/30 transition-colors">
            <Crosshair className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold leading-none tracking-tight">
              HEADSHOT <span className="text-primary">DB</span>
            </h1>
            <p className="text-[0.65rem] font-mono text-muted-foreground uppercase tracking-[0.2em] leading-tight">
              Free Fire Sensitivity Tool
            </p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-primary font-bold">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
