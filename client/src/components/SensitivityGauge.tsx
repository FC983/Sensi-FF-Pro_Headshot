import { motion } from "framer-motion";

interface SensitivityGaugeProps {
  label: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
}

export function SensitivityGauge({ label, value, max = 100, icon }: SensitivityGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {icon && <span className="text-primary">{icon}</span>}
          {label}
        </div>
        <div className="font-mono text-xl font-bold text-white">
          {value}
        </div>
      </div>
      
      <div className="h-4 bg-secondary border border-border/50 relative overflow-hidden rounded-sm skew-x-[-12deg]">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-border/30" />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary/60 via-primary to-white/90 relative"
        >
          {/* Glare effect */}
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
        </motion.div>
      </div>
    </div>
  );
}
