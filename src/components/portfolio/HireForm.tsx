import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { SectionTitle } from "./SectionTitle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Loader2, CheckCircle2, FileText } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.string().min(1, "Pick a project type"),
  message: z.string().trim().min(10, "Tell me at least a sentence").max(2000),
});

const projectTypes = ["Web App", "Mobile App", "SaaS Product", "Landing Page", "AI Integration", "Consulting"];

export const HireForm = () => {
  const [data, setData] = useState({ name: "", email: "", projectType: "", message: "" });
  const [budget, setBudget] = useState([10000]);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File too large", { description: "Max size is 10MB." });
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
    toast.success("Application sent!", { description: "I'll get back to you within 24h." });
    setData({ name: "", email: "", projectType: "", message: "" });
    setBudget([10000]);
    setFile(null);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <section id="hire" className="relative py-24 md:py-32">
      <div className="container">
        <SectionTitle
          eyebrow="Work With Me"
          title="Have a project in mind?"
          subtitle="Tell me about your idea — budget, scope, timeline. I'll get back within 24 hours."
        />

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto glass rounded-3xl p-8 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="hname">Your Name</Label>
              <Input id="hname" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="mt-2 bg-muted/40" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="hemail">Email</Label>
              <Input id="hemail" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="mt-2 bg-muted/40" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Label>Project type</Label>
            <Select value={data.projectType} onValueChange={(v) => setData({ ...data, projectType: v })}>
              <SelectTrigger className="mt-2 bg-muted/40">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectType && <p className="text-xs text-destructive mt-1">{errors.projectType}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Estimated budget</Label>
              <span className="font-mono text-primary text-sm">
                ${budget[0].toLocaleString()}{budget[0] >= 50000 ? "+" : ""}
              </span>
            </div>
            <Slider value={budget} onValueChange={setBudget} min={1000} max={50000} step={500} className="mt-4" />
            <div className="flex justify-between text-xs text-muted-foreground font-mono mt-2">
              <span>$1k</span><span>$25k</span><span>$50k+</span>
            </div>
          </div>

          <div>
            <Label htmlFor="hmsg">Tell me about it</Label>
            <Textarea id="hmsg" rows={5} placeholder="Goals, scope, timeline, anything that matters…" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} className="mt-2 bg-muted/40 resize-none" />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>

          <div>
            <Label>Attach a brief (optional)</Label>
            <label className="mt-2 flex items-center justify-center gap-3 px-4 py-6 rounded-xl border border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/60 hover:bg-muted/40 transition-colors">
              {file ? (
                <>
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm">{file.name}</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">PDF, DOC, or image — up to 10MB</span>
                </>
              )}
              <input type="file" className="hidden" accept=".pdf,.doc,.docx,image/*" onChange={onFile} />
            </label>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading || done}>
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
            ) : done ? (
              <><CheckCircle2 className="h-4 w-4" /> Sent!</>
            ) : (
              "Submit Application"
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};
