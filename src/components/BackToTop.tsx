"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cx(
        "fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-background shadow-lg transition-all duration-300 hover:border-copper hover:text-copper sm:bottom-6",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
