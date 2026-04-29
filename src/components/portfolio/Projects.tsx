import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const projects = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS Dashboard",
    image: p1,
    gallery: [p1, p3, p4],
    description:
      "A real-time analytics dashboard with custom charting, role-based access, and a plugin system. Built for a Series B startup, it powers reporting for 50+ teams.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "tRPC"],
    live: "#",
    repo: "#",
  },
  {
    title: "Lumen Commerce",
    tag: "E-commerce",
    image: p2,
    gallery: [p2, p1, p4],
    description:
      "A headless storefront with offline-first cart, instant search, and a custom CMS. Lighthouse 99 across the board.",
    stack: ["Remix", "Stripe", "Algolia", "Sanity"],
    live: "#",
    repo: "#",
  },
  {
    title: "Aether AI",
    tag: "AI Assistant",
    image: p3,
    gallery: [p3, p1, p2],
    description:
      "Conversational AI with retrieval-augmented generation, voice mode, and multi-tenant workspaces.",
    stack: ["React", "FastAPI", "OpenAI", "pgvector"],
    live: "#",
    repo: "#",
  },
  {
    title: "Helix Trade",
    tag: "Fintech",
    image: p4,
    gallery: [p4, p1, p3],
    description:
      "A trading terminal with sub-100ms market data streaming, advanced charting, and broker integrations.",
    stack: ["React", "WebSocket", "Rust", "TimescaleDB"],
    live: "#",
    repo: "#",
  },
];

export const Projects = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLang();
  const active = open !== null ? projects[open] : null;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container">
        <SectionTitle
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative text-left glass rounded-3xl overflow-hidden border-border hover:border-primary/40 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-primary">
                  {p.tag}
                </div>
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold group-hover:text-gradient transition-all">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl glass-strong border-border">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DialogHeader>
                  <div className="text-xs font-mono uppercase tracking-widest text-primary">
                    {active.tag}
                  </div>
                  <DialogTitle className="font-display text-3xl">{active.title}</DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    {active.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {active.gallery.map((g, idx) => (
                        <CarouselItem key={idx}>
                          <div className="aspect-[16/9] rounded-xl overflow-hidden">
                            <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="hero" asChild>
                    <a href={active.live} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" /> {t.projects.live}
                    </a>
                  </Button>
                  <Button variant="neon" asChild>
                    <a href={active.repo} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> {t.projects.source}
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};
