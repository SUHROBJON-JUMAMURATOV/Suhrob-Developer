import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Send } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";

const socials = [
  { name: "Telegram", href: "https://t.me/", Icon: Send, color: "primary", handle: "@alexcarter" },
  { name: "Instagram", href: "https://instagram.com/", Icon: Instagram, color: "accent", handle: "@alex.builds" },
  { name: "GitHub", href: "https://github.com/", Icon: Github, color: "secondary", handle: "alexcarter" },
  { name: "LinkedIn", href: "https://linkedin.com/", Icon: Linkedin, color: "primary", handle: "in/alexcarter" },
];

const colorMap: Record<string, string> = {
  primary: "hover:shadow-[0_0_40px_hsl(180_100%_50%/0.6)] hover:border-primary group-hover:text-primary",
  accent: "hover:shadow-[0_0_40px_hsl(320_100%_60%/0.6)] hover:border-accent group-hover:text-accent",
  secondary: "hover:shadow-[0_0_40px_hsl(280_90%_60%/0.6)] hover:border-secondary group-hover:text-secondary",
};

export const Socials = () => {
  return (
    <section id="socials" className="relative py-20">
      <div className="container">
        <SectionTitle eyebrow="Connect" title="Find me online" />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={cn(
                "group glass rounded-2xl p-6 flex flex-col items-center text-center transition-all border",
                colorMap[s.color]
              )}
            >
              <s.Icon className="h-9 w-9 text-foreground transition-colors" />
              <div className="mt-3 font-display font-semibold">{s.name}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">{s.handle}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
