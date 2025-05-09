"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutPreview.module.css";
import Link from "next/link";

export default function AboutPreview() {
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
    <section className={styles.aboutPreviewContainer}>
      <div
        ref={contentRef}
        className={`${styles.textColumn} ${animate ? styles.animate : ""}`}
      >
        <h2 className={styles.aboutTitle}>O nama</h2>
        <p className={styles.aboutText}>
          E. S. Vet d.o.o. je veterinarska stanica koja je potpuno posvećena
          dobrobiti Vaših ljubimaca. Nudimo preventivnu njegu, opštu hirurgiju,
          zubne usluge, dijagnostičko snimanje, laboratorijska ispitivanja na
          licu mesta, identifikaciju mikro čipova, farmaceutske proizvode...
        </p>
        <button className="button secondaryButton">
          <Link href="/o-nama#about-section" className="secondaryButtonLink">
            Saznaj više
          </Link>
        </button>
      </div>

      <div className={styles.imageColumn}>
        <Image
          src="/vet.png"
          alt="Veterinar"
          className={styles.vetImage}
          fill
          priority
        />
      </div>
    </section>
  );
}
