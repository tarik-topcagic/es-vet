"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SloganPreview.module.css";

export default function SloganPreview() {
  const [animate, setAnimate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.sloganPreviewContainer}>
      <div className={styles.imageColumn}>
        <Image
          src="/owneranddog.png"
          alt="Owner and Dog"
          className={styles.sloganImage}
          fill
          priority
        />
      </div>

      <div
        ref={contentRef}
        className={`${styles.textColumn} ${animate ? styles.animate : ""}`}
      >
        <div className={styles.sloganWrapper}>
          <div className={styles.lemonShape}></div>
          <h2 className={styles.sloganText}>
            Zdravi ljubimci, sretni vlasnici! 🐾
          </h2>
        </div>
      </div>
    </section>
  );
}
