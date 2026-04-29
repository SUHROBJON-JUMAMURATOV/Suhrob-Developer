import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Briefcase, GraduationCap, Rocket, Sparkles, Code2, Cpu } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const timeline = [
  {
    year: "2024 — Present",
    title: "Senior Full-Stack Engineer",
    org: "Nimbus Labs",
    desc: "Leading product engineering for a real-time AI collaboration platform serving 200k+ users.",
    Icon: Rocket,
  },
  {
    year: "2021 — 2024",
    title: "Full-Stack Developer",
    org: "Vertex Studio",
    desc: "Shipped 30+ client projects using React, Node, and Postgres. Built internal design system.",
    Icon: Briefcase,
  },
  {
    year: "2017 — 2021",
    title: "B.Sc. Computer Science",
    org: "Stanford University",
    desc: "Focused on distributed systems and human-computer interaction. Graduated with honors.",
    Icon: GraduationCap,
  },
];

export const About = () => {
  const { t } = useLang();
  const stats = t.about.stats;
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container">
        <SectionTitle
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        <div className="grid lg:grid-cols-5 gap-10 mt-16">
          {/* Stats + CV */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 relative overflow-hidden h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/30 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-16 rounded-2xl glass flex items-center justify-center neon-glow-cyan"
                >
                  <Code2 className="h-7 w-7 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-16 w-16 rounded-2xl glass flex items-center justify-center neon-glow-magenta"
                >
                  <Sparkles className="h-7 w-7 text-accent" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-16 rounded-2xl glass flex items-center justify-center neon-glow-purple"
                >
                  <Cpu className="h-7 w-7 text-secondary" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="lg:col-span-3 relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-50" />
            <ul className="space-y-8">
              {timeline.map((t, i) => (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-1 h-10 w-10 rounded-xl glass flex items-center justify-center neon-glow-cyan">
                    <t.Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="glass rounded-2xl p-5 hover:border-primary/40 transition-colors">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">
                      {t.year}
                    </div>
                    <h4 className="mt-1 font-display text-xl font-semibold">{t.title}</h4>
                    <div className="text-sm text-muted-foreground">{t.org}</div>
                    <p className="mt-3 text-sm text-foreground/80">{t.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
