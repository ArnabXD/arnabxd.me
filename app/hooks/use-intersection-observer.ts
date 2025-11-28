import { useState, useEffect, useRef } from "react";
import { useIsClient } from "./use-client";

export const useIntersectionObserver = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isClient]);

  return { ref, inView: isInView };
};