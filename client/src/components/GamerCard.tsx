import { motion } from "framer-motion";
import { Smartphone, Crosshair } from "lucide-react";
import { type Phone } from "@shared/schema";

interface GamerCardProps {
  phone: Phone;
  onClick: () => void;
}

export function GamerCard({ phone, onClick }: GamerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-secondary/40 border border-border hover:border-primary/50 overflow-hidden cursor-pointer rounded-sm transition-all duration-300"
      onClick={onClick}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded border border-border/50">
            DPI: <span className="text-primary font-bold">{phone.dpi}</span>
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {phone.model}
        </h3>
        <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-4">
          {phone.brand}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border/50 pt-3 mt-auto">
          <Crosshair className="w-3 h-3 text-primary" />
          <span>General Sens: <span className="text-white font-mono">{phone.generalSensitivity}</span></span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
