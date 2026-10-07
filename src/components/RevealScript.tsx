"use client";

import { useEffect } from "react";

export function RevealScript() {
  useEffect(() => {
    // Bail early when the user prefers reduced motion or the API isn't available
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    const toAnimate: HTMLElement[] = [];

    els.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      const delay = el.dataset.revealDelay;
      if (delay) el.style.transitionDelay = `${delay}ms`;

      if (top >= vh || bottom <= 0) {
        // Only hide elements that are genuinely off-screen
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition =
          "opacity 0.7s ease, transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)";
        toAnimate.push(el);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const t = entry.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = "translateY(0)";
            io.unobserve(t);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    toAnimate.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
