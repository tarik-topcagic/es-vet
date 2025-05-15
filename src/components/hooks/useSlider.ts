import { useState, useRef, useEffect, useCallback } from "react";

interface SliderOptions {
  length: number;
  interval?: number;
  fadeDuration?: number;
}

export function useSlider({
  length,
  interval = 3000,
  fadeDuration = 0,
}: SliderOptions) {
  const randomIndex = Math.floor(Math.random() * length);
  const [currentIndex, setCurrentIndex] = useState(randomIndex);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const performSlide = useCallback(
    (updateFn: (prev: number) => number) => {
      if (fadeDuration > 0) {
        setIsFading(true);
        setTimeout(() => {
          setCurrentIndex(updateFn);
          setIsFading(false);
        }, fadeDuration);
      } else {
        setCurrentIndex(updateFn);
      }
    },
    [fadeDuration]
  );

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = window.setInterval(() => {
      performSlide((i) => (i + 1) % length);
    }, interval);
  }, [interval, length, performSlide, clearTimer]);

  const goNext = useCallback(() => {
    performSlide((i) => (i + 1) % length);
    startTimer();
  }, [performSlide, startTimer, length]);

  const goPrev = useCallback(() => {
    performSlide((i) => (i === 0 ? length - 1 : i - 1));
    startTimer();
  }, [performSlide, startTimer, length]);

  const restart = useCallback(() => {
    performSlide((i) => (i + 1) % length);
    startTimer();
  }, [performSlide, startTimer, length]);

  const goTo = useCallback(
    (index: number) => {
      clearTimer();
      setCurrentIndex(index % length);
      startTimer();
    },
    [startTimer, clearTimer, length]
  );

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  return { currentIndex, isFading, goNext, goPrev, restart, goTo };
}
