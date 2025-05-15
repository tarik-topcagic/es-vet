import { useState, useEffect, RefObject } from "react";

export function useOnScreen<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "0px",
  threshold = 0
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isVisible;
}
