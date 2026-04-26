import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionTitle = ({ eyebrow, title, subtitle, align = "center", className }: Props) => (
  <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
    {eyebrow && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary mb-4"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-base md:text-lg text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);
