import { usePhone } from "@/hooks/use-phones";
import { useRoute } from "wouter";
import { Loader2, ArrowLeft, Target, Eye, ZoomIn, Crosshair, Smartphone } from "lucide-react";
import { SensitivityGauge } from "@/components/SensitivityGauge";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function PhoneDetail() {
  const [, params] = useRoute("/phone/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { data: phone, isLoading, error } = usePhone(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="font-mono text-primary animate-pulse">CALIBRATING DATA...</p>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-16 h-16 bg-destructive/20 border border-destructive text-destructive flex items-center justify-center rounded-sm">
          <Crosshair className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">DEVICE NOT FOUND</h2>
        <p className="text-muted-foreground">The requested configuration data is missing or corrupted.</p>
        <Link href="/" className="mt-4 px-6 py-2 bg-secondary hover:bg-secondary/80 text-white rounded font-mono uppercase text-sm border border-border transition-colors">
          Return to Base
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto px-4 py-8"
    >
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono uppercase text-sm tracking-wider">Back to Database</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Phone Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-secondary/30 border border-border p-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Smartphone className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-display font-bold text-white mb-2 leading-none text-shadow-glow">
                {phone.model}
              </h1>
              <p className="text-lg text-primary font-mono uppercase tracking-widest mb-8">
                {phone.brand}
              </p>

              <div className="space-y-4">
                <div className="bg-background/50 p-4 rounded border border-border/50">
                  <span className="block text-xs text-muted-foreground uppercase mb-1">Recommended DPI</span>
                  <span className="block text-4xl font-mono font-bold text-primary">{phone.dpi}</span>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded text-xs text-muted-foreground font-mono leading-relaxed">
                  OPTIMIZED CONFIGURATION LOADED. APPLY SETTINGS IN-GAME FOR MAXIMUM PERFORMANCE.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sensitivity Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 bg-secondary/20 p-8 border border-border rounded-sm backdrop-blur-sm">
            <h2 className="text-xl font-display font-bold flex items-center gap-3 border-b border-border/50 pb-4">
              <Target className="text-primary" />
              SENSITIVITY MATRIX
            </h2>

            <div className="space-y-8">
              <SensitivityGauge 
                label="General Sensitivity" 
                value={phone.generalSensitivity} 
                icon={<Crosshair className="w-4 h-4" />}
              />
              <SensitivityGauge 
                label="Red Dot" 
                value={phone.redDotSensitivity} 
                icon={<div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_red]" />}
              />
              <SensitivityGauge 
                label="2x Scope" 
                value={phone.x2ScopeSensitivity} 
                icon={<ZoomIn className="w-4 h-4" />}
              />
              <SensitivityGauge 
                label="4x Scope" 
                value={phone.x4ScopeSensitivity} 
                icon={<ZoomIn className="w-4 h-4" />}
              />
              <SensitivityGauge 
                label="Sniper Scope" 
                value={phone.sniperScopeSensitivity} 
                icon={<Target className="w-4 h-4" />}
              />
              <SensitivityGauge 
                label="Free Look" 
                value={phone.freeLookSensitivity} 
                icon={<Eye className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
