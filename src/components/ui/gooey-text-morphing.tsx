"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  // useId scopes the filter ID to this instance — prevents collisions when
  // multiple GooeyText components are rendered on the same page.
  const filterId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    // prefers-reduced-motion guard: skip the rAF loop entirely and show the
    // first text statically. Respects WCAG 2.1 SC 2.3.3 (Animation from
    // Interactions) and ui-ux-pro-max §7 `reduced-motion`.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // IMPORTANT: use textContent, never innerHTML — prevents XSS injection.
      text1Ref.current.textContent = texts[0] ?? "";
      text1Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "0%";
      text2Ref.current.style.filter = "";
      return;
    }

    let textIndex = texts.length - 1;
    let morph = 0;
    let cooldown = cooldownTime;
    let lastTime = performance.now();
    let rafId: number;
    let running = true;
    // pendingSwap: true for exactly one frame after a textContent swap so the
    // new content is painted with setMorph(0) state before the morph begins.
    // Eliminates the stale-filter flash that caused the flickering at swap time.
    let pendingSwap = false;

    // Initialize immediately — prevents the empty-frame flash on first paint.
    // IMPORTANT: always use textContent here, never innerHTML.
    // The texts array is the only XSS guard; innerHTML would open injection.
    text1Ref.current.textContent = texts[textIndex % texts.length];
    text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    text1Ref.current.style.opacity = "0%";
    text1Ref.current.style.filter = "";
    text2Ref.current.style.opacity = "100%";
    text2Ref.current.style.filter = "";

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      // Fix 4: clamp fraction to [0.001, 0.999] before computing blur to avoid
      // division-by-zero (8/0 = Infinity) and near-infinite blur values that
      // produce GPU transparency artifacts at both ends of the transition.
      const f = Math.max(0.001, Math.min(0.999, fraction));
      const inv = 1 - f;
      // Fix 3: cap blur at 40px instead of 100px. Values above ~40px on GPU
      // composited layers can cause momentary transparency artifacts in Chrome
      // and Safari, contributing to the visible flicker at transition boundaries.
      text2Ref.current.style.filter = `blur(${Math.min(8 / f - 8, 40)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 40)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0%";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      // Cap dt to 0.1 s so a backgrounded tab doesn't cause a morph jump on return.
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Fix 5: two-phase text swap.
      // Phase 1 (wasCoolingDown): update textContent + freeze visual at morph=0
      //   for one frame so the browser paints new text before any blur is applied.
      // Phase 2 (pendingSwap): clear the hold flag and begin the actual morph.
      // Without this, the same frame that writes new textContent also applies
      // the current (stale) filter state, producing a 1-frame wrong-content flash.
      if (pendingSwap) {
        pendingSwap = false;
        doMorph();
        return;
      }

      const wasCoolingDown = cooldown > 0;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (wasCoolingDown) {
          textIndex = (textIndex + 1) % texts.length;
          // IMPORTANT: use textContent, never innerHTML — see note above.
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
          // Hold morph at 0 for this frame; doMorph runs next frame via pendingSwap.
          setMorph(0);
          pendingSwap = true;
          return;
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    // Pause the loop when the tab is hidden to save battery on mobile.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        running = true;
        lastTime = performance.now(); // reset dt so we don't get a jump
        rafId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      {/* Filter is scoped to this instance via useId — safe to render multiple GooeyText on one page. */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            {/*
              Fix 1: softened feColorMatrix threshold.
              Old row 4: 0 0 0 255 -140  →  threshold = 140/255 ≈ 55%, band ≈ 0.4%
              New row 4: 0 0 0 18 -7     →  threshold =   7/18  ≈ 39%, band ≈ 5.5%

              The ~14× wider transition band eliminates the binary on/off snap
              that caused both texts to dip below the alpha threshold simultaneously,
              producing the 1-2 frame complete-disappearance flicker. The gooey
              morphing shape is preserved; only the harshness of the cutoff is reduced.
            */}
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center w-full h-full"
        style={{ filter: `url(#${filterId})` }}
      >
        {/*
          Fix 2: will-change: filter, opacity pre-promotes both spans to their
          own GPU compositor layers. Without this, the browser must repaint the
          span into the parent layer on every blur/opacity change, introducing a
          repaint stall that manifests as flicker on lower-end hardware.
        */}
        <span
          ref={text1Ref}
          className={cn("absolute inline-block select-none text-center", textClassName)}
          style={{ willChange: "filter, opacity" }}
        />
        <span
          ref={text2Ref}
          className={cn("absolute inline-block select-none text-center", textClassName)}
          style={{ willChange: "filter, opacity" }}
        />
      </div>
    </div>
  );
}
