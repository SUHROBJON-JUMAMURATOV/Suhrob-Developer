import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";
import { useLang } from "@/hooks/useLang";

type Category = "All" | "Frontend" | "Backend" | "Tools";

const skills: { name: string; level: number; category: Exclude<Category, "All"> }[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Framer Motion", level: 85, category: "Frontend" },
  { name: "Node.js / Express", level: 90, category: "Backend" },
  { name: "PostgreSQL", level: 84, category: "Backend" },
  { name: "GraphQL", level: 78, category: "Backend" },
  { name: "Python / FastAPI", level: 75, category: "Backend" },
  { name: "Docker", level: 80, category: "Tools" },
  { name: "AWS", level: 76, category: "Tools" },
  { name: "Figma", level: 82, category: "Tools" },
  { name: "Git / CI", level: 90, category: "Tools" },
];

const categories: Category[] = ["All", "Frontend", "Backend", "Tools"];

export const Skills = () => {
  const [active, setActive] = useState<Category>("All");
  const { t } = useLang();
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container">
        <SectionTitle
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                active === c
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-[0_0_25px_hsl(180_100%_50%/0.45)]"
                  : "glass border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {t.skills.categories[c]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
          {filtered.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-sm text-primary">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.05 }}
                  className="h-full bg-gradient-primary relative"
                >
                  <div className="absolute inset-0 blur-md bg-primary/40" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
