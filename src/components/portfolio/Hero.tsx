import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, UserPlus } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import avatar from "@/assets/avatar.jpg";
import { useLang } from "@/contexts/LanguageContext";

const useTyping = (phrases: readonly string[]) => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1400);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setIdx((i) => i + 1);
        return;
      }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, phrases]);

  return text;
};

export const Hero = () => {
  const { t } = useLang();
  const typed = useTyping(t.hero.roles);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {t.hero.badge}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto mb-8 relative w-32 h-32 md:w-40 md:h-40"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-60 animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-primary via-secondary to-accent">
            <img
              src={avatar}
              alt="JUMAMURATOV SUHROBJON XAMZAYEVICH"
              className="w-full h-full rounded-full object-cover bg-background"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
        >
          {t.hero.greeting} <span className="text-gradient block sm:inline mt-2 sm:mt-0">{t.hero.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-xl md:text-2xl font-mono text-muted-foreground h-8"
        >
          <span className="cursor-blink neon-text-cyan">{typed}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="hero" size="xl">
            <a href="#projects">
              {t.hero.viewProjects} <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="neon" size="xl">
            <a href="#hire">
              <Briefcase className="h-4 w-4" /> {t.hero.hireMe}
            </a>
          </Button>
          <Button asChild variant="ghostGlass" size="xl">
            <a href="#register">
              <UserPlus className="h-4 w-4" /> {t.hero.register}
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
