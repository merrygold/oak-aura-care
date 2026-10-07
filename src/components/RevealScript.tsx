"use client";

import { useEffect } from "react";

export function RevealScript() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Pre-mark elements already in the viewport as visible BEFORE activating
    // the CSS hiding system — this prevents the "empty space on load" flash.
    const vh = window.innerHeight;
    els.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < vh && bottom > 0) {
        el.classList.add("is-visible");
      }
      const delay = el.dataset.revealDelay;
      if (delay) el.style.transitionDelay = `${delay}ms`;
    });

    // Now activate the reveal system — CSS will hide below-fold elements only
    document.body.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
