import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VantaBackground from "../components/VantaBackground";
import "./Newsletter.css";

type Person = {
  name: string;
  tag?: string;
  bio: string;
  tiktok?: string;
  extraLinks?: { label: string; href: string }[];
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max <= 0 ? 0 : (scrollTop / max) * 100;
      setP(clamp(next, 0, 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/** read element size (for responsive bauble sizing) */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

/** True initials (2–3 letters), stable + readable */
function initialsLabel(name: string) {
  const clean = name
    .replace(/—/g, " ")
    .replace(/–/g, " ")
    .replace(/-/g, " ")
    .replace(/[().,']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const skip = new Set(["author", "indie", "narrator", "the", "of", "and"]);
  const parts = clean
    .split(" ")
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !skip.has(p.toLowerCase()));

  if (parts.length === 1) {
    const one = parts[0];
    const pick = one.length >= 3 ? one.slice(0, 3) : one.slice(0, 2);
    return pick.toUpperCase();
  }

  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  let out = (a + b).toUpperCase();

  if (out.length < 2 && parts[2]) out += parts[2][0].toUpperCase();
  if (out.length === 2 && parts.length >= 3 && (parts[0].length + parts[1].length) > 12) {
    out += parts[2][0].toUpperCase();
  }

  return out.slice(0, 3);
}

/** Constellation overlay */
function ConstellationField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const STAR_COUNT = 120;
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(0.6, 1.8),
      a: rand(0.15, 0.7),
      vx: rand(-0.015, 0.015),
      vy: rand(-0.015, 0.015),
      tw: rand(0.001, 0.006),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      g.addColorStop(0, "rgba(255,255,255,0.02)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.a = clamp(s.a + (Math.random() - 0.5) * s.tw, 0.08, 0.85);
        const x = s.x * w;
        const y = s.y * h;

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();

        s.x += s.vx * 0.002;
        s.y += s.vy * 0.002;

        if (s.x < -0.05) s.x = 1.05;
        if (s.x > 1.05) s.x = -0.05;
        if (s.y < -0.05) s.y = 1.05;
        if (s.y > 1.05) s.y = -0.05;
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];

          const ax = a.x * w;
          const ay = a.y * h;
          const bx = b.x * w;
          const by = b.y * h;

          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(225,167,48,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-70" aria-hidden="true" />;
}

/** Snow overlay (NO fog fill, no grey wash) */
function SnowField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const flakes = Array.from({ length: 120 }).map(() => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(0.6, 2.2),
      a: rand(0.10, 0.30),
      vy: rand(0.15, 0.55),
      vx: rand(-0.18, 0.18),
      wob: rand(0.0015, 0.0045),
      t: rand(0, Math.PI * 2),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const f of flakes) {
        f.t += f.wob;
        const x = f.x * w + Math.sin(f.t) * 10;
        const y = f.y * h;

        ctx.beginPath();
        ctx.arc(x, y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.a})`;
        ctx.fill();

        f.y += f.vy * 0.0018;
        f.x += f.vx * 0.0012;

        if (f.y > 1.05) {
          f.y = -0.05;
          f.x = rand(0, 1);
        }
        if (f.x < -0.05) f.x = 1.05;
        if (f.x > 1.05) f.x = -0.05;
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_10%,rgba(225,167,48,0.12),transparent_55%)]" />
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.24em] text-white/60">{title}</div>
        <div className="mt-2 text-sm text-white/80 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

/** Garlands + bounce physics baubles */
function BubbleField({ people, onPick }: { people: Person[]; onPick: (p: Person) => void }) {
  const { ref: wrapRef, size } = useElementSize<HTMLDivElement>();
  const hoverRef = useRef(false);

  const palette = [
    ["#c81d25", "#ffb703"],
    ["#0b6e4f", "#7ae582"],
    ["#1d4ed8", "#93c5fd"],
    ["#7c3aed", "#f0abfc"],
    ["#b45309", "#fde68a"],
    ["#0f766e", "#67e8f9"],
    ["#be123c", "#fecdd3"],
    ["#374151", "#e5e7eb"],
  ];

  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  };

  const seeded = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // ✅ This is the ref fix: keep refs aligned with nodes
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const nodes = useMemo(() => {
    const fieldW = size.w || 980;

    // chunky scale based on field width (desktop = bigger)
    const base = clamp(78 + (fieldW - 520) * 0.10, 78, 168);

    return people.map((p, i) => {
      const r3 = seeded(i * 39.346 + 1.3);
      const jitter = Math.floor((r3 - 0.5) * 14); // -7..+7
      const sz = clamp((p.tag ? base + 18 : base + 10) + jitter, 78, 178);

      const idx = hash(p.name) % palette.length;
      const [c1, c2] = palette[idx];

      return {
        p,
        size: sz,
        radius: sz / 2,
        c1,
        c2,
        label: initialsLabel(p.name),
      };
    });
  }, [people, size.w]);

  // keep refs array length synced (prevents undefined indexing errors)
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, nodes.length);
  }, [nodes.length]);

  const simRef = useRef<{
    w: number;
    h: number;
    raf: number;
    garlands: { yBase: number; amp: number; freq: number; phase: number; drift: number }[];
    items: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      idx: number;
      g: number;
      down: boolean;
      hover: boolean;
    }[];
    mouse: { x: number; y: number; inside: boolean };
  } | null>(null);

  const setBubbleLight = (el: HTMLElement, e: React.PointerEvent) => {
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  // init/reinit when size or nodes changes
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!size.w || !size.h) return;

    const w = size.w;
    const h = size.h;

    const strandCount = h < 620 ? 2 : h < 760 ? 3 : 4;

    const garlands = Array.from({ length: strandCount }).map((_, gi) => {
      const yBase = h * (0.28 + (gi * 0.46) / Math.max(1, strandCount - 1));
      const amp = 22 + gi * 6;
      const freq = 1.15 + gi * 0.25;
      const phase = seeded(gi * 99.1) * Math.PI * 2;
      const drift = (gi % 2 === 0 ? 1 : -1) * (0.18 + seeded(gi * 31.7) * 0.18);
      return { yBase, amp, freq, phase, drift };
    });

    const items: any[] = [];
    nodes.forEach((n, idx) => {
      const margin = n.radius + 12;
      const g = idx % garlands.length;

      const gx = ((idx + 1) / (nodes.length + 1)) * w;
      const gg = garlands[g];
      const yPref = gg.yBase + Math.sin((gx / w) * Math.PI * 2 * gg.freq + gg.phase) * gg.amp;

      let x = clamp(gx + (seeded(idx * 17.3) - 0.5) * 160, margin, w - margin);
      let y = clamp(yPref + (seeded(idx * 23.7) - 0.5) * 120, margin, h - margin);

      // de-overlap
      for (let tries = 0; tries < 140; tries++) {
        let ok = true;
        for (let j = 0; j < idx; j++) {
          const o = items[j];
          const dx = x - o.x;
          const dy = y - o.y;
          const min = n.radius + o.radius + 18;
          if (dx * dx + dy * dy < min * min) {
            ok = false;
            x = clamp(margin + seeded(idx * 11.1 + tries) * (w - margin * 2), margin, w - margin);
            const y2 = gg.yBase + Math.sin((x / w) * Math.PI * 2 * gg.freq + gg.phase) * gg.amp;
            y = clamp(y2 + (seeded(idx * 8.3 + tries) - 0.5) * 120, margin, h - margin);
            break;
          }
        }
        if (ok) break;
      }

      const vx = (seeded(idx * 9.2 + 0.3) - 0.5) * 1.2;
      const vy = (seeded(idx * 11.8 + 0.6) - 0.5) * 1.0;

      items.push({ x, y, vx, vy, radius: n.radius, idx, g, down: false, hover: false });
    });

    simRef.current = {
      w,
      h,
      raf: 0,
      garlands,
      items,
      mouse: { x: 0, y: 0, inside: false },
    };
  }, [nodes, size.w, size.h, wrapRef]);

  // mouse tracking
  useEffect(() => {
    const wrap = wrapRef.current;
    const sim = simRef.current;
    if (!wrap || !sim) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      sim.mouse.x = e.clientX - r.left;
      sim.mouse.y = e.clientY - r.top;
      sim.mouse.inside = true;
    };
    const onLeave = () => {
      sim.mouse.inside = false;
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [wrapRef]);

  // physics loop
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;

    const DAMP = 0.993;
    const SPEED_LIMIT = 2.25;
    const REST = 0.93;
    const REPULSION = 0.74;
    const PADDING = 16;

    const CURSOR_RADIUS = 170;
    const CURSOR_PUSH = 0.070; // lively but not "run away"
    const CENTER_PULL = 0.00035;

    // garland pull
    const GARLAND_PULL = 0.0017;
    const GARLAND_DAMP = 0.0028;
    const GARLAND_SWAY = 0.00035;

    const tick = () => {
      const { w, h, items, mouse, garlands } = sim;
      const cx = w * 0.5;
      const cy = h * 0.55;

      for (let gi = 0; gi < garlands.length; gi++) {
        garlands[gi].phase += garlands[gi].drift * 0.0035;
      }

      const cursorActive = mouse.inside && !hoverRef.current;

      for (const it of items) {
        if (!nodes[it.idx]) continue;

        // freeze on press (so clicks are easy)
        if (it.down) {
          it.vx *= 0.85;
          it.vy *= 0.85;
        } else {
          // soft center pull to keep them “in frame”
          it.vx += (cx - it.x) * CENTER_PULL;
          it.vy += (cy - it.y) * CENTER_PULL;

          // garland tether
          const g = garlands[it.g];
          const yPref = g.yBase + Math.sin((it.x / w) * Math.PI * 2 * g.freq + g.phase) * g.amp;
          const dy = yPref - it.y;
          it.vy += dy * GARLAND_PULL;
          it.vx += Math.cos((it.x / w) * Math.PI * 2 * g.freq + g.phase) * GARLAND_SWAY * 120;

          // cursor repulsion (off while hovering)
          if (cursorActive) {
            const dx = it.x - mouse.x;
            const dy2 = it.y - mouse.y;
            const d2 = dx * dx + dy2 * dy2;
            const r2 = CURSOR_RADIUS * CURSOR_RADIUS;

            if (d2 < r2) {
              const dist = Math.sqrt(d2) || 0.001;
              const nx = dx / dist;
              const ny = dy2 / dist;

              const t = 1 - dist / CURSOR_RADIUS;
              const push = t * t * CURSOR_PUSH;

              it.vx += nx * push * 30;
              it.vy += ny * push * 30;

              // swirl = magic
              it.vx += -ny * push * 7;
              it.vy += nx * push * 7;
            }
          }

          it.x += it.vx;
          it.y += it.vy;

          // walls
          if (it.x - it.radius < 0) {
            it.x = it.radius;
            it.vx = Math.abs(it.vx) * REST;
          }
          if (it.x + it.radius > w) {
            it.x = w - it.radius;
            it.vx = -Math.abs(it.vx) * REST;
          }
          if (it.y - it.radius < 0) {
            it.y = it.radius;
            it.vy = Math.abs(it.vy) * REST;
          }
          if (it.y + it.radius > h) {
            it.y = h - it.radius;
            it.vy = -Math.abs(it.vy) * REST;
          }
        }

        // hover damping makes them catchable
        const dampMult = it.hover ? 0.90 : 1;

        it.vx *= DAMP * dampMult;
        it.vy *= DAMP * dampMult;

        it.vy *= 1 - GARLAND_DAMP;

        it.vx = clamp(it.vx, -SPEED_LIMIT, SPEED_LIMIT);
        it.vy = clamp(it.vy, -SPEED_LIMIT, SPEED_LIMIT);
      }

      // collisions
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const minDist = a.radius + b.radius + PADDING;

          if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;

            const overlap = minDist - dist;
            const push = overlap * 0.5;

            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;

            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const rel = rvx * nx + rvy * ny;

            if (rel < 0) {
              const impulse = -rel * REPULSION;
              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              b.vx += impulse * nx;
              b.vy += impulse * ny;
            }
          }
        }
      }

      // write transforms
      for (const it of items) {
        const el = btnRefs.current[it.idx];
        if (!el) continue;
        el.style.transform = `translate3d(${it.x - it.radius}px, ${it.y - it.radius}px, 0)`;
      }

      sim.raf = requestAnimationFrame(tick);
    };

    sim.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(sim.raf);
  }, [nodes]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[620px] sm:h-[680px] md:h-[760px] lg:h-[860px] rounded-[2rem] border border-white/10 bg-transparent overflow-hidden baubleWrap"
    >
      <div className="absolute inset-0 pointer-events-none bubble-grid" />

      <SnowField className="z-[2] opacity-0" />
      <div className="absolute inset-0 pointer-events-none baubleGlow z-[3]" />

      {nodes.map((n, idx) => (
        <button
          key={`${n.p.name}-${idx}`}
          ref={(el) => {
            btnRefs.current[idx] = el;
          }}
          type="button"
          className="bubble bubblePhys"
          style={
            {
              width: n.size,
              height: n.size,
              ["--c1" as any]: n.c1,
              ["--c2" as any]: n.c2,
              ["--mx" as any]: "35%",
              ["--my" as any]: "30%",
            } as React.CSSProperties
          }
          onPointerEnter={(e) => {
            hoverRef.current = true;
            const sim = simRef.current;
            if (sim?.items[idx]) sim.items[idx].hover = true;
            setBubbleLight(e.currentTarget, e);
          }}
          onPointerLeave={() => {
            hoverRef.current = false;
            const sim = simRef.current;
            if (sim?.items[idx]) sim.items[idx].hover = false;
          }}
          onPointerMove={(e) => setBubbleLight(e.currentTarget, e)}
          onPointerDown={() => {
            const sim = simRef.current;
            if (sim?.items[idx]) sim.items[idx].down = true;
          }}
          onPointerUp={() => {
            const sim = simRef.current;
            if (sim?.items[idx]) sim.items[idx].down = false;
          }}
          onPointerCancel={() => {
            const sim = simRef.current;
            if (sim?.items[idx]) sim.items[idx].down = false;
          }}
          onClick={() => onPick(n.p)}
          aria-label={`Open ${n.p.name}`}
          title={n.p.name}
        >
          <span className="bubbleShine" />
          <span className="bubbleCap" aria-hidden="true" />
          <span className="bubbleText">
            <span className="bubbleShort">{n.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Newsletter() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Person | null>(null);
  const progress = useScrollProgress();

  const originals: Person[] = useMemo(
    () => [
      { name: "Ria K", tag: "Original Member", bio: "Author, original Inkbound co-founder with Amanda, crafter, list-maker and the rare soul who actually remembers to bring the list.", tiktok: "https://www.tiktok.com/@riak233" },
      { name: "Roma S", tag: "Original Member", bio: "There would be no books in Inkbound without her. PA extraordinaire, chaos-wrangler, and an all-round incredible human.", tiktok: "https://www.tiktok.com/@roma_booktok" },
      { name: "Gina P", tag: "Original Member", bio: "Exceptional author and organiser of absolutely everything, the formatter who quietly makes impossible timelines work and creator of the Fall for Grace Series on TikTok.", tiktok: "https://www.tiktok.com/@ginaparrillo" },
      { name: "Ethan M", tag: "Original Member", bio: "Author, indie author advocate, and exceptional voice actor, keeper of everyone’s sanity and bringer of perfectly timed humour.", tiktok: "https://www.tiktok.com/@ethanmorrisvoice" },
      { name: "Ash B", tag: "Original Member", bio: "Indie author advocate and artist with truly astronomical talent, chopper of wood, keeper of living plants, and proud member of the raccoon burrito trio.", tiktok: "https://www.tiktok.com/@reptilesandreads" },
      { name: "Sabrina K", tag: "Original Member", bio: "Indie author advocate, owner of Triple Moon Proofing, maker of dangerously good playlists, and part of the raccoon burrito trio.", tiktok: "https://www.tiktok.com/@sabrina.k227" },
      { name: "Phineas D", tag: "Original Member", bio: "Author, all-round exceptional human, helper of everyone, founder of Pocket Wizard Formatting, voice of Harrold, and reliable bringer of joy.", tiktok: "https://www.tiktok.com/@phindelgado" },
      { name: "Surf H", tag: "Original Member", bio: "Resident vampire and writer of stunning books, alter ego Captain Surf, steadfast supporter of everyone, and just a genuinely good soul.", tiktok: "https://www.tiktok.com/@sherediaauthor" },
      { name: "Dad", tag: "Original Member", bio: "Called Dad by everyone who’s ever met him. The sounding board, the best hug-giver in any county, and the man who never once told Amanda the sky wasn’t hers to claim.", tiktok: "https://www.tiktok.com/@patkilkenny3" },
    ],
    []
  );

  const widerCircle: Person[] = useMemo(
    () => [
      { name: "Momma D", bio: "Indie author advocate & avid reader.", tiktok: "https://www.tiktok.com/@mommad1452?lang=en-GB" },
      { name: "Author Jens Xant", bio: "Author, Indie Advocate & Inkbound supporter.", tiktok: "https://www.tiktok.com/@yourgenxaunt2?lang=en-GB" },
      { name: "Grizz — Author C.G. Steele", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@c.g.steele?lang=en-GB" },
      { name: "Blynn Cole", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@authorblynncole?lang=en-GB" },
      { name: "Leslie’s New Chapter", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@lesliegarcia0311?lang=en-GB" },
      { name: "Tullie Summers", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@tulliesummers?lang=en-GB" },
      { name: "Author Dewing VA", bio: "Author, Narrator & Inkbound supporter.", tiktok: "https://www.tiktok.com/@authordewingva?lang=en-GB" },
      { name: "Rayne Potter — Narrator", bio: "Narrator & Inkbound supporter.", tiktok: "https://www.tiktok.com/@stormyraynebow?lang=en-GB" },
      { name: "Indie Author David Corbin", bio: "Author, Model & Inkbound supporter.", tiktok: "https://www.tiktok.com/@davidcorbinauthor?lang=en-GB" },
      { name: "LeAnne Hart — Author", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@leannehart.author?lang=en-GB" },
      { name: "Uncle James", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@unclejamesbackup" },
      { name: "Nova", bio: "Voice Actor & Inkbound supporter.", tiktok: "https://www.tiktok.com/@nova.author.01" },
      { name: "D LaRue", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@dlarue91" },
      { name: "SP Rowe", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@northlandfrail.author?lang=en-GB" },
      { name: "Harley S", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@witch_biyatch_666?lang=en-GB" },
      { name: "Amy Reads", bio: "Indie Advocate & Inkbound supporter.", tiktok: "https://www.tiktok.com/@amy.reads719?lang=en-GB" },
      { name: "Starlite Writes", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@starlite.writes?lang=en-GB" },
      { name: "Kat Miranda", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@authorkatmiranda?lang=en-GB" },
      { name: "Miranda Knight", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@arsenic.lollipop?lang=en-GB" },
      { name: "Rivers C", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@jalisco_incident?lang=en-GB" },
      { name: "Terrah F", bio: "Author, Narrator & Inkbound supporter.", tiktok: "https://www.tiktok.com/@terrah.faire?lang=en-GB" },
      { name: "Bree K", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@themacabremillennial?lang=en-GB" },
      { name: "Ebon Rose", bio: "Author, Narrator & Inkbound supporter.", tiktok: "https://www.tiktok.com/@ebon_rose_va?lang=en-GB" },
      { name: "Zachary Maughan", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@zachary.maughan6?lang=en-GB" },
      { name: "S Pedigo", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@s.pedigo?lang=en-GB" },
      { name: "Graham Fontaine", bio: "Author & Inkbound supporter.", tiktok: "https://www.tiktok.com/@authorgrahamfontaine?lang=en-GB" },
      { name: "Sarai M", bio: "Indie Advocate & Inkbound supporter.", tiktok: "https://www.tiktok.com/@saraimakaila?lang=en-GB" },





    ],
    []
  );

  const all = useMemo(() => [...originals, ...widerCircle], [originals, widerCircle]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return all;
    return all.filter((p) => (p.name + " " + p.bio + " " + (p.tag ?? "")).toLowerCase().includes(q));
  }, [all, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <ConstellationField />

      {/* Overlays (minimal, no haze) */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute -top-56 -left-56 h-[820px] w-[820px] rounded-full bg-amber-400/10 blur-[220px]" />
        <div className="absolute -bottom-64 right-[-280px] h-[900px] w-[900px] rounded-full bg-cyan-400/8 blur-[240px]" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-[50] h-[2px] bg-white/5">
        <div className="h-full bg-amber-400/80 shadow-[0_0_18px_rgba(225,167,48,0.55)]" style={{ width: `${progress}%` }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="rounded-[2rem] border border-white/10 bg-black/35 backdrop-blur-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative px-6 sm:px-10 py-12 border-b border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-cyan-400/10" />

            <div className="relative">
              <div className="text-xs tracking-[0.35em] uppercase text-white/70">The Inkbound Society</div>
              <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl tracking-[0.08em] uppercase leading-[1.05]">
                Hall of Flame and a Special Thank you
              </h1>

              <p className="mt-4 max-w-3xl text-sm sm:text-base text-white/75 leading-relaxed">
              This isn’t a newsletter page.
It’s a thank you.

A living record of the people who showed up early, stayed loud, shared skills, gave time, and believed this could be more than an idea.

Every name here helped light the fire.
Click a bauble. Read the story. This is the Hall of Flame.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://inkboundsociety.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center rounded-full border border-black/30 bg-amber-400 px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold text-black hover:brightness-95 shadow-[0_0_30px_rgba(225,167,48,0.35)]"
                >
                  Back to Inkbound
                </a>

                <a
                  href="https://www.instagram.com/the.inkbound.society/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold text-white hover:bg-white/15"
                >
                  Our Instagram
                </a>

                <a
                  href="https://www.tiktok.com/@the.inkbound.society?is_from_web"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold text-white hover:bg-white/15"
                >
                  Our TikTok
                </a>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search names or keywords…"
                  className="w-full sm:max-w-md rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <div className="text-xs text-white/55">Tip: try “Original” / “advocate” / “formatter” / “vampire”.</div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Pillar title="Built in Public" body="Inkbound wasn’t polished. It was built in real time. Messy, honest, loud, and shared. That’s why it worked." />
                <Pillar title="Indie-First" body="No gatekeeping. No hierarchy. No algorithm worship. Just people backing stories they believe in." />
                <Pillar title="Community Flame" body="This exists because people chose to show up for each other. Again and again." />
              </div>
            </div>
          </motion.div>

          {/* BAUBLES */}
          <div className="p-6 sm:p-10">
            <div className="text-xs tracking-[0.32em] uppercase text-white/60">Tap a bauble</div>
            <h2 className="mt-2 text-2xl sm:text-3xl tracking-wide">Christmas ornaments of chaos</h2>
            <p className="mt-2 text-sm text-white/70 max-w-3xl">
              Initials on the baubles. Full names + bios inside. Hover to move the shine. Make sure to give them a follow, you won't regret it. 
            </p>

            <div className="mt-6">
              <BubbleField people={filtered} onPick={setSelected} />
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-black/25 p-6 sm:p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute -inset-10 opacity-70">
                <div className="absolute top-0 left-10 h-52 w-52 rounded-full bg-amber-400/12 blur-3xl" />
                <div className="absolute -top-10 right-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
              </div>

              <div className="relative">
                <h3 className="text-xl sm:text-2xl tracking-wide">Merry Christmas, you absolute legends 🎁</h3>
                <p className="mt-4 text-white/80 leading-relaxed">
                Thank you for believing in indie stories.
Thank you for backing each other when it mattered.
Thank you for helping build something that feels like home.

Inkbound exists because of people like you, the ones who showed up, shared what they had, and lit the way forward.

I hope you have the cosiest, bookiest Christmas, and a new year full of stories worth telling.
                </p>
                <p className="mt-5 text-sm text-white/70">— Amanda - Founder of Inkbound</p>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-8 text-center">
              <p className="text-white/70">Inkbound Bookshop · Inkbound Society
              Built by readers. Held together by community.</p>
              <p className="mt-2 text-xs text-white/50">
                <a
                  href="https://inkboundsociety.com"
                  className="underline decoration-white/25 hover:decoration-white/60"
                  target="_blank"
                  rel="noreferrer"
                >
                  inkboundsociety.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelected(null)} />

            <motion.div
              className="relative w-full max-w-xl rounded-[2rem] border border-white/15 bg-black/35 backdrop-blur-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-semibold text-white">{selected.name}</h3>
                      {selected.tag && (
                        <span className="text-[0.65rem] uppercase tracking-[0.18em] rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/80">
                          {selected.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-white/80 leading-relaxed">{selected.bio}</p>
                  </div>

                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs tracking-[0.22em] uppercase hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selected.tiktok && (
                    <a
                      href={selected.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs tracking-[0.22em] uppercase font-semibold text-white hover:bg-white/15"
                    >
                      TikTok →
                    </a>
                  )}

                  {selected.extraLinks?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs tracking-[0.22em] uppercase font-semibold text-white hover:bg-white/15"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
